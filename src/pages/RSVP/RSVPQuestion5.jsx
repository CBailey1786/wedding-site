// src/pages/RSVPQuestion5.jsx
import "./RSVPMain.css";
import { getPronouns } from "./utils";

export default function RSVPQuestion5({ guest, value, onChange, onNext,nextLabel, onBack }) {
  // value shape: { hasRequirements: "yes" | "no" | null, options: string[], other: string }
  const hasRequirements =
  value?.hasRequirements === "yes"
    ? "yes"
    : value?.hasRequirements === "no"
    ? "no"
    : null;

  console.log(value)

  const options = value?.options ?? [];
  const otherText = value?.other ?? "";

  const { subject } = getPronouns(guest)

  const DIET_OPTIONS = [
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "gluten_free", label: "Gluten-free" },
    { id: "lactose_free", label: "Lactose-free" },
    { id: "other", label: "Other" },
  ];

  const otherSelected = options.includes("other");
  const showSpecify = hasRequirements === "yes";

  const updateValue = (partial) => {
    onChange({
      hasRequirements,
      options,
      other: otherText,
      ...partial,
    });
  };

  const handleYesNo = (answer) => {
    if (answer === "no") {
      // clear details if they switch back to No
      updateValue({
        hasRequirements: "no",
        options: [],
        other: "",
      });
    } else {
      updateValue({ hasRequirements: "yes" });
    }
  };

  const handleToggleOption = (id) => {
    const currentlySelected = options.includes(id);
    let nextOptions;

    if (currentlySelected) {
      nextOptions = options.filter((opt) => opt !== id);
    } else {
      nextOptions = [...options, id];
    }

    // if they unselect "other", clear text
    if (!nextOptions.includes("other")) {
      updateValue({ options: nextOptions, other: "" });
    } else {
      updateValue({ options: nextOptions });
    }
  };

  const handleOtherTextChange = (e) => {
    updateValue({ other: e.target.value });
  };

  // --- canContinue logic ---
  const hasAnsweredYesNo = hasRequirements === "yes" || hasRequirements === "no";

  // If they say "no", they can go straight on.
  let canContinue = hasRequirements === "no";

  if (hasRequirements === "yes") {
    const anyStandardOption = options.some((id) => id !== "other");
    const anyOtherText = otherText.trim().length > 0;
    canContinue = anyStandardOption || anyOtherText;
  }

  return (
    <>
      {/* Progress bar placeholder */}
      <div className="rsvp-progress">
        <div className="rsvp-progress-bar rsvp-progress-bar--step5" />
      </div>

      <div className="rsvp-step">

      <div className="answer_list">
        <p className="rsvp-question">
          Do {subject} have any special dietary requirements?
        </p>

        {/* Yes / No */}
        <button
          type="button"
          className={
            "answer " + (hasRequirements === "yes" ? "selected" : "unselected")
          }
          onClick={() => handleYesNo("yes")}
        >
          Yes
        </button>

        <button
          type="button"
          className={
            "answer " + (hasRequirements === "no" ? "selected" : "unselected")
          }
          onClick={() => handleYesNo("no")}
        >
          No
        </button>

        {/* Extra section only if Yes */}
        {showSpecify && (
          <>
            <p className="rsvp-subheading">Please specify:</p>

            {DIET_OPTIONS.map((opt) => {
              const selected = options.includes(opt.id);
              const isOther = opt.id === "other";

              return (
                <div key={opt.id} className="answer_list">
                  <button
                    type="button"
                    className={
                      "answer " + (selected ? "selected" : "unselected")
                    }
                    onClick={() => handleToggleOption(opt.id)}
                  >
                    {opt.label}
                  </button>

                  {/* Show textarea when "Other" is selected */}
                  {isOther && selected && (
                    <div className="answer_list">
                      <p className="diet-other-label">
                        Other:
                      </p>
                      <textarea
                        className="diet-other-textarea"
                        value={otherText}
                        onChange={handleOtherTextChange}
                        placeholder="Please specify…"
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              );
            })}
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
            disabled={!canContinue || !hasAnsweredYesNo}
          >
            {nextLabel ?? "Next"}
          </button>
        </div>
      </div>
      </div>
      </>
  );
}
