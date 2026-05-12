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
        last_name
      `)
      ;

    if (error) throw error;

    const flattened = (data || []).map((row: any) => ({
      first_name: row.first_name,
      last_name: row.last_name,

      submitted_at: row.created_at,
    }));

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