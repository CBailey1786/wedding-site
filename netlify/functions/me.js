import { parseSessionFromCookie } from "./_auth.js";
import { getPartyWithDetails, supabase } from "./_db.ts";

export const handler = async (event) => {
  const session = parseSessionFromCookie(event.headers?.cookie);

  if (!session || !session.party_id) {
    return { statusCode: 401, body: "Not authenticated" };
  }

  try {
    const partyId = session.party_id;

    // 🔥 1) Record visit via RPC
    const { error: visitError } = await supabase.rpc(
      "record_party_visit",
      { party_id_input: partyId }
    );

    if (visitError) {
      console.error("Visit tracking failed:", visitError);
      // Do NOT block the user if tracking fails
      // Just log it and continue
    }

    // 2) Load full nested party data
    const party = await getPartyWithDetails(partyId);
    if (!party) {
      return { statusCode: 404, body: "Party not found" };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(party),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: "Error loading party",
    };
  }
};