import { supabase } from "./_db.ts";
import { signSession, makeCookie } from "./_auth.js";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  

  const { username, password, rememberMe } = JSON.parse(event.body || "{}");
  console.log(rememberMe)
  const genericError = { statusCode: 401, body: "Invalid credentials" };

  if (!username || !password) return genericError;

  if (password !== process.env.GENERIC_WEDDING_PASSWORD) {
    return genericError;
  }

  // username is citext in DB so eq() is case-insensitive
  const { data: party, error } = await supabase
    .from("parties")
    .select("party_id, username, display_name")
    .eq("username", username.trim())
    .maybeSingle();

  if (error || !party) {
    return genericError;
  }

  console.log("rememberMe",rememberMe)
  // Coerce rememberMe into a proper boolean
  const remember =
    rememberMe === true ||
    rememberMe === "true" ||
    rememberMe === "on" ||
    rememberMe === 1 ||
    rememberMe === "1";

  const token = signSession(
    {
      party_id: party.party_id,
      username: party.username,
    },
    remember
  );

  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": makeCookie(token, remember),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ok: true,
      display_name: party.display_name,
    }),
  };
};
