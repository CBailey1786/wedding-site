// src/pages/RSVPSummary.jsx
import "./RSVPMain.css";
import pencil from "../../assets/pencil.svg";

function toProperCase(str) {
return str
.toLowerCase() // Convert the entire string to lowercase
.split(' ') // Split the string into an array of words
.map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
.join(' '); // Join the words back into a single string
}


export default function RSVPSummary({ guest, answers, onEdit, onSubmit, submitting }) {
  // answers is the object for this guest only, e.g. answers[selectedGuest.guest_id]

  const rsvpLabel =
    answers?.attending === "accept"
      ? "Yes"
      : answers?.attending === "decline"
      ? "No"
      : "Not answered";

  const eventsLabel = (() => {
    const events = answers?.events ?? [];
    if (!events.length) return "No events selected";
    // customise this mapping to your event IDs → labels
    const EVENT_LABELS = {
      rehearsal_dinner: "Rehearsal Dinner",
      welcome_party: "Welcome Party",
      wedding: "Wedding Ceremony & Reception",
      farewell_brunch: "Farewell Brunch",
    };

    var output = ""
    if (events.length > 1){
      output = events.length + " events"
    }
    else(
      output = events.map((id) => EVENT_LABELS[id] || id).join(", ")
    )

    return output

  })();

  const starterLabel = toProperCase(answers?.starter) ?? "Not selected";
  const mainLabel = toProperCase(answers?.main) ?? "Not selected";

  const dietaryLabel = (() => {
    const d = answers?.dietary;
    if (!d || !d.hasRequirements) return "Not answered";
    if (d.hasRequirements === "no") return "No dietary requirements";

    const DIET_LABELS = {
      vegetarian: "Vegetarian",
      vegan: "Vegan",
      gluten_free: "Gluten-free",
      lactose_free: "Lactose-free",
      other: d.other || "Other",
    };

    const parts = (d.options ?? []).map((id) => DIET_LABELS[id] || id);
    if (!parts.length && d.other) parts.push(d.other);
    return toProperCase(parts.join(", "));
  })();

  const hotelLabel = (() => {
    const h = answers?.hotel;
    if (!h || !h.hotel) return "Not answered";
    if (h.hotel === "other") return h.otherHotel || "Other";
    if (h.hotel === "prefer_not_to_say") return "Prefer not to say";
    const HOTEL_LABELS = {
      grosvenor: "Grosvenor House",
      treehouse: "The Treehouse",
    };
    return HOTEL_LABELS[h.hotel] || h.hotel;
  })();

  const transportLabel = (() => {
    const t = answers?.transport;
    if (t === "accept") return "Yes";
    if (t === "decline") return "No";
    return "Not answered";
  })();

  const emailLabel = answers?.email || "Not provided";

  const rows = [
    { key: "rsvp", label: "RSVP:", value: rsvpLabel },
    { key: "events", label: "EVENTS:", value: eventsLabel },
    { key: "starter", label: "STARTER:", value: starterLabel },
    { key: "main", label: "MAIN:", value: mainLabel },
    { key: "dietary", label: "DIETARY:", value: dietaryLabel },
    { key: "hotel", label: "HOTEL:", value: hotelLabel },
    { key: "transport", label: "TRANSPORT:", value: transportLabel },
    { key: "email", label: "EMAIL:", value: emailLabel },
  ];

  return (
    <div className="rsvp-step">

      <div className="answer_list">
        <p className="summary-label">SUMMARY</p>

        {rows.map((row) => (
          <div key={row.key} className="answer multiline summary-row">
            <div className="summary-text">
              <span className="summary-label-key">{row.label}</span>
              <span className="summary-value">{row.value}</span>
            </div>
            <button
              type="button"
              className="summary-edit-button"
              onClick={() => onEdit(row.key)}
            >
              <img src={pencil} alt="Edit" className="edit_symbol" />
            </button>
          </div>
        ))}

        <div className="rsvp-step-actions">
          <button
            type="button"
            className="rsvp-button primary-button"
            onClick={onSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
