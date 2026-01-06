// netlify/functions/_db.ts

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  { auth: { persistSession: false } }
);

// Load one party + all related info
export async function getPartyWithDetails(partyId: string) {
  const { data, error } = await supabase
    .from("parties")
    .select(`
      party_id,
      username,
      display_name,
      coming_from_abroad,
      arrival_date,
      guests:guests (
        guest_id,
        first_name,
        last_name,
        is_child,
        has_plus_one,
        in_wedding_party,
        additional_comments,
        has_RSVP,
        is_plus_one,
        main_guest_id,
        hotels:hotels (
          hotel_id,
          hotel,
          transport_required
        ),
        events:events (
          events_id,
          rsvp,
          attending_rehearsal_dinner,
          attending_welcome_party,
          attending_wedding,
          attending_farewell_brunch,
          email
        ),
        food:food (
          food_id,
          starter,
          main,
          dietary_requirements,
          dietary_requirements_details
        )
      )
    `)
    .eq("party_id", partyId)
    .maybeSingle();

  if (error) throw error;
  return data;
}
