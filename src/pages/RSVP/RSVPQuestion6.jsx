// src/pages/RSVPQuestion6.jsx
import "./RSVPMain.css";

export default function RSVPQuestion6({ guest, value, onChange, onNext,nextLabel, onBack }) {
  // value shape: { hotel: "grosvenor" | "treehouse" | "other" | "prefer_not_to_say" | null, otherHotel: string }
  const selectedHotel = value?.hotel ?? null;
  const otherHotel = value?.otherHotel ?? "";

  const HOTEL_OPTIONS = [
    { id: "grosvenor", label: "Grosvenor House" },
    { id: "treehouse", label: "The Treehouse" },
    { id: "other", label: "Other" },
  ];

  const handleSelect = (id) => {
    // When changing away from "other", clear the text field
    if (id !== "other") {
      onChange({ hotel: id, otherHotel: "" });
    } else {
      onChange({ hotel: id, otherHotel });
    }
  };

  const handleOtherTextChange = (e) => {
    onChange({
      hotel: selectedHotel ?? "other",
      otherHotel: e.target.value,
    });
  };

  // --- canContinue logic ---
  let canContinue = !!selectedHotel;
  if (selectedHotel === "other") {
    // Require them to actually type something if they pick Other.
    // If you *don't* want this requirement, just remove this block.
    canContinue = otherHotel.trim().length > 0;
  }

  const showOtherTextarea = selectedHotel === "other";

  return (
    <div className="rsvp-step">
      {/* Progress bar placeholder */}
      <div className="rsvp-progress">
        <div className="rsvp-progress-bar rsvp-progress-bar--step6" />
      </div>

      <div className="answer_list">
        <p className="rsvp-question">Which hotel will you be staying in?</p>

        {HOTEL_OPTIONS.map((opt) => {
          const selected = selectedHotel === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              className={
                "answer " + (selected ? "selected" : "unselected")
              }
              onClick={() => handleSelect(opt.id)}
            >
              {opt.label}
            </button>
          );
        })}

        {showOtherTextarea && (
          <>
            <p className="rsvp-subheading">Please specify the hotel&apos;s address:</p>
            <textarea
              className="diet-other-textarea" // reuse your textarea styling
              value={otherHotel}
              onChange={handleOtherTextChange}
              placeholder="Hotel address"
              rows={3}
            />
          </>
        )}

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
