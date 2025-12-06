// src/pages/GuestSelect.jsx (or in components/, up to you)
import pencil from "../../assets/pencil.svg";
import rightArrow from "../../assets/right-arrow.svg";
import "./RSVPMain.css"; // if it contains the .guest styles etc.

export default function GuestSelect({ guests, onSelectGuest }) {
  const completed = guests?.filter((g) => g.has_RSVP) ?? [];
  const incomplete = guests?.filter((g) => !g.has_RSVP) ?? [];

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
                onClick={() => onSelectGuest(g)}
              >
                <p className="guest_name selected">
                  {g.first_name} {g.last_name}
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
                onClick={() => onSelectGuest(g)}
              >
                <p className="guest_name unselected">
                  {g.first_name} {g.last_name}
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
