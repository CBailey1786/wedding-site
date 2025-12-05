import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  { auth: { persistSession: false } }
);

export const handler: Handler = async () => {
  console.log("Using Supabase URL:", process.env.SUPABASE_URL);

  const { data, error } = await supabase
    .from("parties")        // <- ensure this matches your real table name
    .select("*")            // select everything for debugging
    .limit(5);

  console.log("Supabase data:", data);
  console.log("Supabase error:", error);

  if (error) {
    return {
      statusCode: 500,
      body: "Error talking to Supabase: " + error.message,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
};
