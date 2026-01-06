// src/pages/RSVPSummary.jsx
import "./RSVPMain.css";
import pencil from "../../assets/pencil.svg";

function toProperCase(str) {
  if (typeof str !== "string" || !str.trim()) return ""; // ✅ null-safe
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function RSVPSummary({
  guest,
  answers,
  onEdit,
  onSubmit,
  onBack,
  submitting,
  summaryView,
  canResubmit,
}) {
  const attending = answers?.attending ?? null;

  const rsvpLabel =
    attending === "accept" ? "Yes" : attending === "decline" ? "No" : "Not answered";

  // ✅ If declined: only show RSVP row + a small message
  if (attending === "decline") {
    return (
      <div className="rsvp-step">
        <div className="answer_list">
          <p className="summary-label">SUMMARY</p>

          <div className="answer multiline summary-row">
            <div className="summary-text">
              <span className="summary-label-key">RSVP:</span>
              <span className="summary-value">{rsvpLabel}</span>
            </div>

            {/* only allow editing the RSVP answer */}
            <button
              type="button"
              className="summary-edit-button"
              onClick={() => onEdit("rsvp")}
            >
              <img src={pencil} alt="Edit" className="edit_symbol" />
            </button>
          </div>

          {!guest.is_plus_one &&
          <p className="summary-note" style={{ marginTop: 12 }}>
            We’re sorry you can’t join us — you will be missed.
          </p>
  }
          <div className="rsvp-step-actions">
            {summaryView === "initial" && (
              <button
                type="button"
                className="rsvp-button primary-button"
                onClick={onSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            )}

            {summaryView === "review" && (
              <>
                <button
                  type="button"
                  className="rsvp-button secondary-button"
                  onClick={onBack}
                  disabled={submitting}
                >
                  Back
                </button>

                <button
                  type="button"
                  className="rsvp-button primary-button"
                  onClick={onSubmit}
                  disabled={!canResubmit}
                  title={!canResubmit ? "Make a change to enable resubmission" : ""}
                >
                  {submitting ? "Resubmitting..." : "Resubmit"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---- Normal (accept / not answered) summary below ----

  const eventsLabel = (() => {
    const events = answers?.events ?? [];
    if (!events.length) return "No events selected";
    const EVENT_LABELS = {
      rehearsal_dinner: "Rehearsal Dinner",
      welcome_party: "Welcome Party",
      wedding: "Wedding Ceremony & Reception",
      farewell_brunch: "Farewell Brunch",
    };

    if (events.length > 1) return `${events.length} events`;
    return events.map((id) => EVENT_LABELS[id] || id).join(", ");
  })();

  const starterLabel = toProperCase(answers?.starter) || "Not selected";
  const mainLabel = toProperCase(answers?.main) || "Not selected";

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
    return toProperCase(parts.join(", ")) || "Not answered";
  })();

  const hotelLabel = (() => {
    const h = answers?.hotel;
    if (!h || !h.hotel) return "Not answered";
    if (h.hotel === "other") return h.otherHotel || "Other";

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

      const isPlusOne = guest?.is_plus_one === true;
const bringingGuest = answers?.attending === "accept";

const plusOneNameLabel = (() => {
  const fn = answers?.plusOne?.first_name ?? "";
  const ln = answers?.plusOne?.last_name ?? "";
  const full = `${fn} ${ln}`.trim();
  return full || "Not provided";
})();

  const rows = [
    { key: "rsvp", label: "RSVP:", value: rsvpLabel },
      ...(isPlusOne && bringingGuest
    ? [{ key: "plusOne", label: "NAME:", value: plusOneNameLabel }]
    : []),
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
          {summaryView === "initial" && (
            <button
              type="button"
              className="rsvp-button primary-button"
              onClick={onSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          )}

          {summaryView === "review" && (
            <>
              <button
                type="button"
                className="rsvp-button secondary-button"
                onClick={onBack}
                disabled={submitting}
              >
                Back
              </button>

              <button
                type="button"
                className="rsvp-button primary-button"
                onClick={onSubmit}
                disabled={!canResubmit}
                title={!canResubmit ? "Make a change to enable resubmission" : ""}
              >
                {submitting ? "Resubmitting..." : "Resubmit"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
