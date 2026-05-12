import { createClient } from "@supabase/supabase-js";
import { parseSessionFromCookie } from "./_auth.js";
import { getPartyWithDetails } from "./_db.ts";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const handler = async (event: any) => {
  // 1) Auth: must be logged in
  const session = parseSessionFromCookie(event.headers?.cookie);

  if (!session || !session.party_id) {
    return { statusCode: 401, body: "Not authenticated" };
  }

  try {
    // 2) Authorize: must be admin
    const party = await getPartyWithDetails(session.party_id);

    if (!party) {
      return { statusCode: 404, body: "Party not found" };
    }

    // IMPORTANT: adjust this field name if yours differs
    if (!party.is_admin) {
      return { statusCode: 403, body: "Forbidden" };
    }

    // 3) Run the admin-only query (service role)
    const { data, error } = await supabase
      .from("guests")
      .select(`
        first_name,
        last_name,

        food!inner (
        starter,
        main,
        dietary_requirements,
        dietary_requirements_details,
        created_at

        ),
        events!inner (
          rsvp,
          attending_welcome_party,
          attending_wedding,
          attending_farewell_brunch
        ),

        parties!inner(
        most_recent_visit, 
        first_visit)
      `)

    if (error) throw error;

const flattened = (data || []).map((row: any) => {
  const food = Array.isArray(row.food) ? row.food[0] : row.food;
  const events = Array.isArray(row.events) ? row.events[0] : row.events;
  const parties = Array.isArray(row.parties) ? row.parties[0] : row.parties;

  return {
    first_name: row.first_name ?? "",
    last_name: row.last_name ?? "",
    rsvp: events?.rsvp ?? null,
    starter: food?.starter ?? null,
    main: food?.main ?? null,
    attending_welcome_party: events?.attending_welcome_party ?? null,
    attending_wedding: events?.attending_wedding ?? null,
    attending_farewell_brunch: events?.attending_farewell_brunch ?? null,
    dietary_requirements: food?.dietary_requirements ?? null,
    dietary_requirements_details: food?.dietary_requirements_details ?? null,
    submitted_at: food?.created_at ?? null,
    first_visit: parties?.first_visit ?? null,
    most_recent_visit: parties?.most_recent_visit ?? null,
  };
});
    

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flattened),
    };
  } catch (err: any) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err?.message || "Server error" }),
    };
  }
};