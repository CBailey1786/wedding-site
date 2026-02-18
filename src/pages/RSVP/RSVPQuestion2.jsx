// src/pages/RSVPQuestion2.jsx
import "./RSVPMain.css";
import { getPronouns } from "./utils";

export default function RSVPQuestion2({
  guest,
  value = [],
  onChange,
  onNext,
  nextLabel,
  onBack,
}) {

  const { subject } = getPronouns(guest)

  // you can move this list up to the parent and pass it in as a prop if you want
  const EVENT_OPTIONS = [
    {
      id: "rehearsal_dinner",
      label: "Rehearsal Dinner",
      sublabel: "Friday 12th June",
    },
    {
      id: "welcome_party",
      label: "Welcome Party",
      sublabel: "Friday 12th June",
    },
    {
      id: "wedding",
      label: "Wedding Ceremony & Reception",
      sublabel: "Saturday 13th June",
    },
    {
      id: "farewell_brunch",
      label: "Farewell Brunch",
      sublabel: "Sunday 14th June",
    },
  ];

  const visibleOptions = EVENT_OPTIONS.filter(
  (event) =>
    event.id !== "rehearsal_dinner" || guest.in_wedding_party === true
);

  const handleToggle = (eventId) => {
    const isSelected = value.includes(eventId);
    if (isSelected) {
      onChange(value.filter((id) => id !== eventId));
    } else {
      onChange([...value, eventId]);
    }
  };

  const canContinue = value.length > 0; // or true if attending none is allowed

  return (
    <div className="rsvp-step">
      {/* Progress bar placeholder */}
      <div className="rsvp-progress">
        <div className="rsvp-progress-bar rsvp-progress-bar--step2" />
      </div>

      <div className="answer_list">
        <p className="rsvp-question">
          Please select all of the events { subject } will be attending:
        </p>

        {visibleOptions.map((event) => {
          const isSelected = value.includes(event.id);
          return (
            <button
              key={event.id}
              type="button"
              className={
                "answer multiline " + (isSelected ? "selected" : "unselected")
              }
              onClick={() => handleToggle(event.id)}
            >
              <span className="answer-label">{event.label}</span>
              {event.sublabel && (
                <span className="answer-sublabel">{event.sublabel}</span>
              )}
            </button>
          );
        })}

        <div className="rsvp-step-actions">
          <button
            type="button"
            className="rsvp-button secondary-button"
            onClick={onBack}
          >
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
