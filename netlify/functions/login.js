import { supabase } from "./_db.ts";
import { signSession, makeCookie } from "./_auth.js";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  

  const { firstName, surname, password, rememberMe } = JSON.parse(event.body || "{}");
  console.log(rememberMe)
  const genericError = { statusCode: 401, body: "Invalid credentials" };

  if (!firstName || !surname || !password) return genericError;

  if (password !== process.env.GENERIC_WEDDING_PASSWORD) {
    return genericError;
  }

  const first = firstName.trim();
  const last = surname.trim();

  // Pull back up to 2 matches so we can detect duplicates cheaply
  const { data: guests, error } = await supabase
    .from("guests")
    .select("party_id, first_name, last_name")
    .ilike("first_name", first)
    .ilike("last_name", last)
    .limit(2);


  if (error || !guests || guests.length === 0) {
    return genericError;
  }

  if (guests.length > 1) {
    return {
      statusCode: 409,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: false,
        error: "DUPLICATE_NAME",
        message:
          "More than one guest has that name — please try logging in using a different member of the party.",
      }),
    };
  }

  const guest = guests[0];

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
      party_id: guest.party_id,
      firstName: guest.first_name,
      surname: guest.last_name,
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
      ok: true
    }),
  };
};
