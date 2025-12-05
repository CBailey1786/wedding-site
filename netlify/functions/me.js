import { parseSessionFromCookie } from "./_auth.js";
import { getPartyWithDetails } from "./_db.js";

export const handler = async (event) => {
  const session = parseSessionFromCookie(event.headers.cookie);

  if (!session || !session.party_id) {
    return { statusCode: 401, body: "Not authenticated" };
  }

  try {
    const party = await getPartyWithDetails(session.party_id);
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
