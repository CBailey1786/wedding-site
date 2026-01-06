const { createClient } = require("@supabase/supabase-js");

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

function toBoolAttending(attending) {
  return attending === "accept";
}

function toBoolTransport(transport) {
  return transport === "accept";
}

function buildDietaryDetails(dietary) {
  if (!dietary) return null;

  const opts = Array.isArray(dietary.options) ? dietary.options : [];
  const parts = [...opts];

  // If you want "other" to mean "free text", keep this:
  if (dietary.other && dietary.other.trim()) {
    parts.push(dietary.other.trim());
  }

  return parts.length ? parts.join(", ") : null;
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const guest_id = body.guest_id;
    const a = body.answers;

    if (!guest_id || !a) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing guest_id or answers" }),
      };
    }

    const now = new Date().toISOString();

    // --- Load the guest so we know if it's a plus-one ---
    const { data: guestRow, error: guestLoadErr } = await supabaseAdmin
      .from("guests")
      .select("guest_id, is_plus_one")
      .eq("guest_id", guest_id)
      .single();

    if (guestLoadErr) throw guestLoadErr;

    const isPlusOne = guestRow?.is_plus_one === true;

    // --- If plus one: update name fields from answers.plusOne ---
    if (isPlusOne) {
      const first = a?.plusOne?.first_name?.trim() || null;
      const last = a?.plusOne?.last_name?.trim() || null;

      const { error: plusOneNameErr } = await supabaseAdmin
        .from("guests")
        .update({
          first_name: first,
          last_name: last,
          updated_at: now,
        })
        .eq("guest_id", guest_id);

      if (plusOneNameErr) throw plusOneNameErr;
    }

    const attendingBool = toBoolAttending(a.attending);

    // If declined, overwrite everything with nulls/false
    const isDecline = a.attending === "decline";

    const ev = Array.isArray(a.events) ? a.events : [];

    const eventsRow = {
      guest_id,
      rsvp: attendingBool,
      attending_rehearsal_dinner: isDecline ? false : ev.includes("rehearsal_dinner"),
      attending_welcome_party: isDecline ? false : ev.includes("welcome_party"),
      attending_wedding: isDecline ? false : ev.includes("wedding"),
      attending_farewell_brunch: isDecline ? false : ev.includes("farewell_brunch"),
      email: isDecline ? null : (a.email ?? null),
      updated_at: now,
    };

    const hasDietary =
      a?.dietary?.hasRequirements === "yes"; // ✅ fixes the Boolean("no") bug

    const foodRow = {
      guest_id,
      starter: isDecline ? null : (a.starter ?? null),
      main: isDecline ? null : (a.main ?? null),
      dietary_requirements: isDecline ? null : hasDietary,
      dietary_requirements_details: isDecline ? null : buildDietaryDetails(a?.dietary),
      updated_at: now,
    };

    const hotelStr = (() => {
      if (isDecline) return null;
      if (a?.hotel?.hotel === "other") return (a?.hotel?.otherHotel ?? "").trim() || null;
      return a?.hotel?.hotel ?? null;
    })();

    const hotelsRow = {
      guest_id,
      hotel: hotelStr,
      transport_required: isDecline ? null : toBoolTransport(a.transport),
      updated_at: now,
    };

    // Requires UNIQUE constraint on guest_id in each table
    const { error: eventsErr } = await supabaseAdmin
      .from("events")
      .upsert(eventsRow, { onConflict: "guest_id" });
    if (eventsErr) throw eventsErr;

    const { error: foodErr } = await supabaseAdmin
      .from("food")
      .upsert(foodRow, { onConflict: "guest_id" });
    if (foodErr) throw foodErr;

    const { error: hotelsErr } = await supabaseAdmin
      .from("hotels")
      .upsert(hotelsRow, { onConflict: "guest_id" });
    if (hotelsErr) throw hotelsErr;

    // Mark RSVP complete
    const { error: guestErr } = await supabaseAdmin
      .from("guests")
      .update({
        has_RSVP: true,
        updated_at: now,
      })
      .eq("guest_id", guest_id);

    if (guestErr) throw guestErr;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error("submitRSVP error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to submit RSVP",
        detail: err?.message || String(err),
      }),
    };
  }
};
