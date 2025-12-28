// src/pages/RSVPQuestion1.jsx
import "./RSVPMain.css"; // reuse your styling if you want

export default function RSVPQuestion3({ guest, value, onChange, onNext,nextLabel, onBack }) {
  const handleSelect = (answer) => {
    onChange(answer); // "accept" or "decline"
  };

  const STARTER_OPTIONS = [
    {
      id: "burrata",
      label: "Prosciutto & Burrata",
      sublabel: "with marinated heritage tomato & sourdough",
    },
    {
      id: "raviolo",
      label: "Black Truffle Raviolo (v)",
      sublabel: "with parmesan velouté",
    },

  ];

  const canContinue = STARTER_OPTIONS.some(o => o.id === value);

  return (
    <>
      
      {/* Progress bar placeholder */}
      <div className="rsvp-progress">
        <div className="rsvp-progress-bar rsvp-progress-bar--step1" />
      </div>



      <div className="answer_list">
              <p className="rsvp-question">
        Please select your starter:
      </p>

        {STARTER_OPTIONS.map((starter) => {
          const isSelected = value.includes(starter.id);
          return (
            <button
              key={starter.id}
              type="button"
              className={
                "answer multiline " + (isSelected ? "selected" : "unselected")
              }
              onClick={() => handleSelect(starter.id)}
            >
              <span className="answer-label">{starter.label}</span>
              {starter.sublabel && (
                <span className="answer-sublabel">{starter.sublabel}</span>
              )}
            </button>
          );
        })}

        {/* <button
          type="button"
          className={
            "answer " + (value === "burrata" ? "selected" : "unselected")
          }
          onClick={() => handleSelect("burrata")}
        >
          Joyfully Accept
        </button>

        <button
          type="button"
          className={
            "answer " + (value === "raviolo" ? "selected" : "unselected")
          }
          onClick={() => handleSelect("decline")}
        >
          Regretfully Decline
        </button> */}
      

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
    </>
  );
}
