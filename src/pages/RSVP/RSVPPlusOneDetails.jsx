// src/pages/RSVPPlusOneDetails.jsx
import "./RSVPMain.css";

export default function RSVPPlusOneDetails({
  attending,          // "accept" | "decline" | null
  onAttendingChange,  // (next) => void
  value,              // answers.plusOne: { first_name, last_name }
  onChange,           // (nextPlusOne) => void
  onNext,
  onBack,
  nextLabel,
}) {
  const first = value?.first_name ?? "";
  const last = value?.last_name ?? "";

  const bringingGuest =
    attending === "accept" ? "yes" : attending === "decline" ? "no" : null;

  const needsName = bringingGuest === "yes";
  const canContinue =
    bringingGuest === "no" || (needsName && first.trim() && last.trim());

  return (
    <div className="rsvp-step">
      <div className="rsvp-progress">
        <div className="rsvp-progress-bar rsvp-progress-bar--step1" />
      </div>

      <div className="answer_list">
        <p className="rsvp-question">Will you using your plus one invite?</p>

        <button
          type="button"
          className={"answer " + (bringingGuest === "yes" ? "selected" : "unselected")}
          onClick={() => onAttendingChange("accept")}
        >
          Yes
        </button>

        <button
          type="button"
          className={"answer " + (bringingGuest === "no" ? "selected" : "unselected")}
          onClick={() => onAttendingChange("decline")}
        >
          No
        </button>

        {needsName && (
          <>
            <p className="rsvp-question" style={{ marginTop: 12 }}>
              Please enter your guest’s name:
            </p>

            <input
              className="single-line-input"
              placeholder="First name"
              value={first}
              onChange={(e) => onChange({ ...value, first_name: e.target.value })}
            />

            <input
              className="single-line-input"
              placeholder="Last name"
              value={last}
              onChange={(e) => onChange({ ...value, last_name: e.target.value })}
            />
          </>
        )}

        <div className="rsvp-step-actions">
          <button type="button" className="rsvp-button secondary-button" onClick={onBack}>
            Back
          </button>

          <button
            type="button"
            className="rsvp-button primary-button"
            onClick={onNext}
            disabled={!canContinue}
          >
            {nextLabel ?? "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
