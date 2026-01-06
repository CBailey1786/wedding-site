// src/pages/GuestSelect.jsx (or in components/, up to you)
import pencil from "../../assets/pencil.svg";
import rightArrow from "../../assets/right-arrow.svg";
import "./RSVPMain.css"; // if it contains the .guest styles etc.

function orderGuestsWithPlusOnes(guests = []) {
  const byMain = new Map();      // main_guest_id -> plus-one guest row
  const mains = [];

  for (const g of guests) {
    if (g.is_plus_one) byMain.set(g.main_guest_id, g);
    else mains.push(g);
  }

  // optional: keep your current main guest ordering stable
  // (or sort alphabetically if you want)
  mains.sort((a, b) =>
    `${a.last_name ?? ""}${a.first_name ?? ""}`.localeCompare(
      `${b.last_name ?? ""}${b.first_name ?? ""}`
    )
  );

  const out = [];
  for (const m of mains) {
    out.push(m);
    const plus = byMain.get(m.guest_id);
    if (plus) out.push(plus);
  }

  // If any plus-ones exist without a matching main guest, append them
  for (const g of guests) {
    if (g.is_plus_one && !mains.some(m => m.guest_id === g.main_guest_id)) {
      out.push(g);
    }
  }

  return out;
}


export default function GuestSelect({ guests, onSelectGuest }) {

  const ordered = orderGuestsWithPlusOnes(guests);

  const completed = ordered.filter((g) => g.has_RSVP);
  const incomplete = ordered.filter((g) => !g.has_RSVP);
  

  function guestDisplayName(g, allGuests) {
    const name = `${g.first_name ?? ""} ${g.last_name ?? ""}`.trim();

    if (!g.is_plus_one) return name || "Guest";

    // plus one
    if (name) return `${name} (Plus One)`;

    const main = allGuests?.find(x => x.guest_id === g.main_guest_id);
    return `Plus One`;
  }


  return (
    <>
      {completed.length > 0 && (
        <>
          <h2>RSVP Complete</h2>
          <div className="answer_list">
            {completed.map((g) => (
              <div
                key={g.guest_id}
                type="button"
                className="answer guest_select selected"
                onClick={() => onSelectGuest(g,"completed")}
              >
                <p className="guest_name selected">
                  {guestDisplayName(g, guests)}
                </p>
                <div className="guest_button light">
                  <img
                    className="guest_symbol dark"
                    src={pencil}
                    alt="edit rsvp"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {incomplete.length > 0 && (
        <>
          <h2>RSVP Incomplete</h2>
          <div className="answer_list">
            {incomplete.map((g) => (
              <div
                key={g.guest_id}
                type="button"
                className="answer guest_select unselected"
                onClick={() => onSelectGuest(g, "incomplete")}
              >
                <p className="guest_name unselected">
                 {guestDisplayName(g, guests)}
                </p>
                <div className="guest_button dark">
                  <img
                    className="guest_symbol light"
                    src={rightArrow}
                    alt="go to rsvp"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
