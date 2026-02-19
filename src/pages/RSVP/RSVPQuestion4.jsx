// src/pages/RSVPQuestion1.jsx
import "./RSVPMain.css"; // reuse your styling if you want
import { getPronouns } from "./utils";

export default function RSVPQuestion4({ guest, value, onChange, onNext,nextLabel, onBack }) {
  const handleSelect = (answer) => {
    onChange(answer); // "accept" or "decline"
  };

  const { possessive } = getPronouns(guest)
  const MAIN_OPTIONS = [
    {
      id: "beef",
      label: "Beef Fillet",
      sublabel: "with shallot tart tatin, wilted greens, celeriac purée & potato fondant",
      allergens: "celery, gluten, sulphites",
    },
    {
      id: "chicken",
      label: "Ruby Chicken",
      sublabel: "Spice rubbed chicken with Mumbai potato, cumin carrot purée & ruby curry sauce",
      allergens: "tbc",
    },
    {
      id: "fish",
      label: "Seared Stone Bass",
      sublabel: "with crsipy Italian potatoes, samphire & lobster velouté",
      allergens: "shellfish, fish, milk, sulphites",
    },
    {
      id: "mushroom",
      label: "Portobello Mushroom (v)",
      sublabel: "with shallot tart tatin, wilted greens, celeriac purée & potato fondant",
      allergens: "celery, gluten, sulphites",
    },


  ];

  const canContinue = MAIN_OPTIONS.some(o => o.id === value);

  return (
    <div className="rsvp-step">
      
      {/* Progress bar placeholder */}
      <div className="rsvp-progress">
        <div className="rsvp-progress-bar rsvp-progress-bar--step1" />
      </div>



      <div className="answer_list">
              <p className="rsvp-question">
        Please select { possessive } main course for the wedding breakfast:
      </p>

        {MAIN_OPTIONS.map((main) => {
          const isSelected = value == main.id;
          return (
            <button
              key={main.id}
              type="button"
              className={
                "answer multiline " + (isSelected ? "selected" : "unselected")
              }
              onClick={() => handleSelect(main.id)}
            >
              <span className="answer-label">{main.label}</span>
              {main.sublabel && (
                <span className="answer-sublabel">{main.sublabel}</span>
              )}
            </button>
          );
        })}
      

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
