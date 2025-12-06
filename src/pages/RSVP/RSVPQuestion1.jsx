// src/pages/RSVPQuestion1.jsx
import "./RSVPMain.css"; // reuse your styling if you want

export default function RSVPQuestion1({ guest, value, onChange, onNext, onBack }) {
  const handleSelect = (answer) => {
    onChange(answer); // "accept" or "decline"
  };
  console.log(guest)
  const canContinue = value === "accept" || value === "decline";

  return (
    <div className="rsvp-step">
      
      {/* Progress bar placeholder */}
      <div className="rsvp-progress">
        <div className="rsvp-progress-bar rsvp-progress-bar--step1" />
      </div>



      <div className="answer_list">
              <p className="rsvp-question">
        Will you be joining us in London for our wedding?
      </p>
        <button
          type="button"
          className={
            "answer " + (value === "accept" ? "selected" : "unselected")
          }
          onClick={() => handleSelect("accept")}
        >
          Joyfully Accept
        </button>

        <button
          type="button"
          className={
            "answer " + (value === "decline" ? "selected" : "unselected")
          }
          onClick={() => handleSelect("decline")}
        >
          Regretfully Decline
        </button>
      

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
          Next
        </button>
      </div>
      </div>
    </div>
  );
}
