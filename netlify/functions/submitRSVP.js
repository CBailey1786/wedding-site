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

  if (opts.includes("other") && dietary.other && dietary.other.trim()) {
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

    const ev = Array.isArray(a.events) ? a.events : [];

    const eventsRow = {
      guest_id,
      rsvp: toBoolAttending(a.attending),
      attending_rehearsal_dinner: ev.includes("rehearsal_dinner"),
      attending_welcome_party: ev.includes("welcome_party"),
      attending_wedding: ev.includes("wedding"),
      attending_farewell_brunch: ev.includes("farewell_brunch"),
      email: a.email ?? null,
      updated_at: now,
    };

    const foodRow = {
      guest_id,
      starter: a.starter ?? null,
      main: a.main ?? null,
      dietary_requirements: Boolean(a?.dietary?.hasRequirements),
      dietary_requirements_details: buildDietaryDetails(a?.dietary),
      updated_at: now,
    };

    const hotelStr =
      a?.hotel?.hotel === "other"
        ? (a?.hotel?.otherHotel ?? "").trim() || null
        : a?.hotel?.hotel ?? null;

    const hotelsRow = {
      guest_id,
      hotel: hotelStr,
      transport_required: toBoolTransport(a.transport),
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
