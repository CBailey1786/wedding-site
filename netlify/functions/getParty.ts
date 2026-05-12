// netlify/functions/getParty.ts
import type { Handler, HandlerEvent } from "@netlify/functions";
import { supabase } from "./_db";
import { getPartyWithDetails } from "./_db";

export const handler: Handler = async (event: HandlerEvent) => {
  const partyId = event.queryStringParameters?.partyId;

  if (!partyId) return { statusCode: 400, body: "Missing partyId" };

  try {
    console.log("[getParty] partyId:", partyId);

    // 1) Call RPC
    const rpcRes = await supabase.rpc("record_party_visit", {
      party_id_input: partyId, // MUST match SQL arg name
    });

    if (rpcRes.error) {
      // Surface it so you actually see it while debugging
      return {
        statusCode: 500,
        body: `RPC error: ${rpcRes.error.message}`,
      };
    }

    // 2) Fetch full party details
    const party = await getPartyWithDetails(partyId);
    if (!party) return { statusCode: 404, body: "Party not found" };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(party),
    };
  } catch (err: any) {
    console.error("[getParty] fatal:", err);
    return { statusCode: 500, body: "Error loading party" };
  }
};