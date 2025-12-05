import { useEffect, useState } from "react";

async function logout() {
  await fetch("/.netlify/functions/logout", {
    method: "POST",
  });

  // Then redirect to login or home
  window.location.href = "/login";
}

export default function RSVP() {
  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    async function load() {
      const res = await fetch("/.netlify/functions/me");
      if (res.status === 401) {
        // not logged in
        window.location.href = "/login";
        return;
      }

      if (res.ok) {
        const json = await res.json();
        setParty(json);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (!party) return <p>Could not load your RSVP details.</p>;

  return (
    <main style={{ padding: "1.5rem" }}>

      <button onClick={logout}>Log out</button>
      <h1>Hi {party.display_name}</h1>

      <h2>Guests</h2>
      <ul>
        {party.guests && party.guests.map((g) => (
          <li key={g.guest_id}>
            <strong>
              {g.first_name} {g.last_name}
            </strong>
            {g.wedding_party && <> — {g.wedding_party}</>}
            {g.events && g.events[0] && (
              <> | RSVP: {g.events[0].RSVP || "Not set"}</>
            )}
          </li>
        ))}
      </ul>

      {/* Later: replace with real forms for hotels/events/food */}
    </main>
  );
}
