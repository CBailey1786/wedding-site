// netlify/functions/getParty.ts
import type { Handler } from "@netlify/functions";
import { getPartyWithDetails } from "./_db";

export const handler: Handler = async (event) => {
  const partyId = event.queryStringParameters?.partyId;

  if (!partyId) {
    return {
      statusCode: 400,
      body: "Missing partyId",
    };
  }

  try {
    const party = await getPartyWithDetails(partyId);
    if (!party) {
      return { statusCode: 404, body: "Party not found" };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(party),
    };
  } catch (err: any) {
    console.error(err);
    return {
      statusCode: 500,
      body: "Error loading party",
    };
  }
};
