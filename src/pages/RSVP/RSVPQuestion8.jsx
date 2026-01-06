// src/pages/RSVPQuestionEmail.jsx
import "./RSVPMain.css";
import { getPronouns } from "./utils";

export default function RSVPQuestion8({ guest, value, onChange, onNext,nextLabel, onBack }) {
  // value is just the email string
  const email = value ?? "";

  const {  object } = getPronouns(guest)

  const handleChange = (e) => {
    onChange(e.target.value);   // pass back the string directly
  };

  const canContinue = email.trim().length > 0;

  return (
    <div className="rsvp-step">
      <div className="rsvp-progress">
        <div className="rsvp-progress-bar rsvp-progress-bar--step7" />
      </div>

      <div className="answer_list">
        <p className="rsvp-question">
          Please provide the best email address to contact {object} in the event of any changes or updates:
        </p>

        <input
          type="email"
          className="single-line-input"
          placeholder="example@gmail.com"
          value={email}
          onChange={handleChange}
        />

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
