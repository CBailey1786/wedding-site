import { useState, useRef, useEffect } from "react";

import "./RSVPMain.css";
import RSVPHeader from "./RSVPHeader";
import GuestSelect from "./GuestSelect";
import RSVPPlusOneDetails from "./RSVPPlusOneDetails";
import RSVPQuestion1 from "./RSVPQuestion1";
import RSVPQuestion2 from "./RSVPQuestion2";
import RSVPQuestion3 from "./RSVPQuestion3";
import RSVPQuestion4 from "./RSVPQuestion4";
import RSVPQuestion5 from "./RSVPQuestion5";
import RSVPQuestion6 from "./RSVPQuestion6";
import RSVPQuestion7 from "./RSVPQuestion7";
import RSVPQuestion8 from "./RSVPQuestion8";
import RSVPSummary from "./RSVPSummary";
import { useToast } from "../../components/Toasts/ToastContext";

import { SUMMARY_STEP, DECLINE_ANSWERS } from "./constants";
import { useParty } from "../../components/Party/PartyContext";
import { useRSVPSteps } from "./useRSVPSteps";

import gsap from "gsap"
import {ScrollTrigger} from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)



export default function RSVPMain() {
  const toast = useToast();
  const { party, loading, reloadParty } = useParty();

  console.log("party",party)
  const {
    step,
    selectedGuest,
    answers,
    summaryView,
    editMode,
    isDirty,

    setStep,
    setAnswers,

    handleBackToGuests,
    handleSelectGuest,
    handleEditFromSummary,
    goForward,
    handleQ1Next,
    handleQ1Back,

    updateAttendanceAnswer,
    updateEventsAnswer,
    updateStarterAnswer,
    updateMainAnswer,
    updateDietaryAnswer,
    updateHotelAnswer,
    updateTransportAnswer,
    updateEmailAnswer,
  } = useRSVPSteps();

  const bodyRef = useRef();
  



  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    if (e?.preventDefault) e.preventDefault();
    if (!selectedGuest) return;

    setSubmitting(true);
    try {
      const res = await fetch("/.netlify/functions/submitRSVP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          guest_id: selectedGuest.guest_id,
          answers,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        await reloadParty();
        toast.success(summaryView === "review" ? "RSVP updated successfully" : "RSVP created successfully");
        window.scrollTo({ top: 0, behavior: "smooth" });
        handleBackToGuests();
      } else {
        console.error(data);
        toast.error(data?.error ?? "Submission failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  const isPlusOne = selectedGuest?.is_plus_one === true;

  if (loading) return <p>Loading…</p>;
  if (!party) return <p>Could not load your RSVP details.</p>;

console.log(selectedGuest)

  return (
    <main className="mainBody RSVPBody" >
      <RSVPHeader guest={selectedGuest} />

      {step === 0 && (
        <div className="select-guest-wrapper">
        <div className="rsvp-select-guest">
          <p>You can amend any response in your RSVP at any time until the deadline of 31st March 2026 (even after you initially submit your response).</p>
          <p>Please select the guest for whom you would like to RSVP:</p>
          
          <GuestSelect guests={party.guests} onSelectGuest={handleSelectGuest} />

          
        </div>
        </div>
      )}

<div className="RSVPBody" ref = {bodyRef}>
{step === 1 && selectedGuest && (
  isPlusOne ? (
    <RSVPPlusOneDetails
      attending={answers.attending ?? null}
      onAttendingChange={updateAttendanceAnswer}
      value={answers.plusOne}
      onChange={(v) => setAnswers(p => ({ ...p, plusOne: v }))}
      onNext={() => {
        // IMPORTANT: only branch on Next (not on selection)
        if (answers.attending === "decline") {
          setAnswers(DECLINE_ANSWERS);
          setStep(SUMMARY_STEP);
          setResumeFromDeclineSummary(false);
        } else {
          goForward(2);
        }
      }}
      nextLabel={editMode ? "Update" : "Next"}
      onBack={editMode ? () => setStep(SUMMARY_STEP) : handleBackToGuests}
    />
  ) : (
    <RSVPQuestion1
      guest={selectedGuest}
      value={answers.attending ?? null}
      onChange={updateAttendanceAnswer}
      onNext={handleQ1Next}
      nextLabel={editMode ? "Update" : "Next"}
      onBack={handleQ1Back}
    />
  )
)}


      {step === 2 && selectedGuest && (
        <RSVPQuestion2
          guest={selectedGuest}
          value={answers.events ?? []}
          onChange={updateEventsAnswer}
          onNext={() => goForward(3)}
          nextLabel={editMode ? "Update" : "Next"}
          onBack={editMode ? () => setStep(SUMMARY_STEP) : () => setStep(1)}
        />
      )}

      {step === 3 && selectedGuest && (
        <RSVPQuestion3
          guest={selectedGuest}
          value={answers.starter ?? null}
          onChange={updateStarterAnswer}
          onNext={() => goForward(4)}
          nextLabel={editMode ? "Update" : "Next"}
          onBack={editMode ? () => setStep(SUMMARY_STEP) : () => setStep(2)}
        />
      )}

      {step === 4 && selectedGuest && (
        <RSVPQuestion4
          guest={selectedGuest}
          value={answers.main ?? null}
          onChange={updateMainAnswer}
          onNext={() => goForward(5)}
          nextLabel={editMode ? "Update" : "Next"}
          onBack={editMode ? () => setStep(SUMMARY_STEP) : () => setStep(3)}
        />
      )}

      {step === 5 && selectedGuest && (
        <RSVPQuestion5
          guest={selectedGuest}
          value={answers.dietary}
          onChange={updateDietaryAnswer}
          onNext={() => goForward(6)}
          nextLabel={editMode ? "Update" : "Next"}
          onBack={editMode ? () => setStep(SUMMARY_STEP) : () => setStep(4)}
        />
      )}

      {step === 6 && selectedGuest && (
        <RSVPQuestion6
          guest={selectedGuest}
          value={answers.hotel}
          onChange={updateHotelAnswer}
          onNext={() => goForward(7)}
          nextLabel={editMode ? "Update" : "Next"}
          onBack={editMode ? () => setStep(SUMMARY_STEP) : () => setStep(5)}
        />
      )}

      {step === 7 && selectedGuest && (
        <RSVPQuestion7
          guest={selectedGuest}
          value={answers.transport ?? null}
          onChange={updateTransportAnswer}
          onNext={() => goForward(8)}
          nextLabel={editMode ? "Update" : "Next"}
          onBack={editMode ? () => setStep(SUMMARY_STEP) : () => setStep(6)}
        />
      )}

      {step === 8 && selectedGuest && (
        <RSVPQuestion8
          guest={selectedGuest}
          value={answers.email ?? ""}
          onChange={updateEmailAnswer}
          onNext={() => goForward(9)}
          nextLabel={editMode ? "Update" : "Next"}
          onBack={editMode ? () => setStep(SUMMARY_STEP) : () => setStep(7)}
        />
      )}

      {step === 9 && selectedGuest && (
        <RSVPSummary
          guest={selectedGuest}
          answers={answers}
          onEdit={handleEditFromSummary}
          onSubmit={handleSubmit}
          onBack={handleBackToGuests}
          submitting={submitting}
          summaryView={summaryView}
          canResubmit={isDirty && !submitting}
        />
      )}
      </div>
    </main>
  );
}
