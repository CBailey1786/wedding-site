import { useMemo, useState } from "react";
import { DECLINE_ANSWERS, DEFAULT_ANSWERS, EDIT_STEP_MAP, SUMMARY_STEP } from "./constants";
import { deepEqual } from "./utils";
import { hydrateAnswersFromGuest } from "./hydrate";

export function useRSVPSteps() {
  const [step, setStep] = useState(0);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [answers, setAnswers] = useState(DEFAULT_ANSWERS);
  const [originalAnswers, setOriginalAnswers] = useState(null);

  const [summaryView, setSummaryView] = useState("initial"); // "initial" | "review"
  const [editMode, setEditMode] = useState(false);
  const [editReturnStep, setEditReturnStep] = useState(SUMMARY_STEP);

  const [resumeFromDeclineSummary, setResumeFromDeclineSummary] = useState(false);

  const isDirty = useMemo(() => {
    if (summaryView !== "review") return true;
    if (!originalAnswers) return true;
    return !deepEqual(answers, originalAnswers);
  }, [answers, originalAnswers, summaryView]);

  // field updaters
  const updateAttendanceAnswer = (answer) => setAnswers((p) => ({ ...p, attending: answer }));
  const updateEventsAnswer = (eventsArray) => setAnswers((p) => ({ ...p, events: eventsArray }));
  const updateStarterAnswer = (answer) => setAnswers((p) => ({ ...p, starter: answer }));
  const updateMainAnswer = (answer) => setAnswers((p) => ({ ...p, main: answer }));
  const updateDietaryAnswer = (dietaryValue) => setAnswers((p) => ({ ...p, dietary: dietaryValue }));
  const updateHotelAnswer = (hotelValue) => setAnswers((p) => ({ ...p, hotel: hotelValue }));
  const updateTransportAnswer = (answer) => setAnswers((p) => ({ ...p, transport: answer }));
  const updateEmailAnswer = (email) => setAnswers((p) => ({ ...p, email }));

  const handleBackToGuests = () => {
    setStep(0);
    setSelectedGuest(null);
    setEditMode(false);
    setSummaryView("initial");
    setOriginalAnswers(null);
    setAnswers(DEFAULT_ANSWERS);
    setResumeFromDeclineSummary(false);
  };

  const handleSelectGuest = (guest, completed) => {
    setSelectedGuest(guest);

    if (completed === "completed") {
      const hydrated = hydrateAnswersFromGuest(guest);
      setAnswers(hydrated);
      setOriginalAnswers(hydrated);
      setSummaryView("review");
      setStep(SUMMARY_STEP);
      return;
    }

    setAnswers(DEFAULT_ANSWERS);
    setOriginalAnswers(null);
    setSummaryView("initial");
    setStep(1);
  };

function handleEditFromSummary(key) {
  const targetStep = EDIT_STEP_MAP[key];
  if (targetStep == null) return;

  // ✅ Editing plus-one name should behave like a normal edit
  if (key === "plusOne") {
    setEditMode(true);
    setEditReturnStep(SUMMARY_STEP);
    setStep(1);
    return;
  }

  // existing special case (declined RSVP edit)
  if (key === "rsvp" && answers?.attending === "decline") {
    setEditMode(false);
    setResumeFromDeclineSummary(true);
    setStep(1);
    return;
  }

  setEditMode(true);
  setEditReturnStep(SUMMARY_STEP);
  setStep(targetStep);
}


  const goForward = (normalNextStep) => {
    if (editMode) {
      setStep(editReturnStep);
      setEditMode(false);
    } else {
      setStep(normalNextStep);
    }
  };

  // Q1 "Next" handler (decline skips)
  const handleQ1Next = () => {
    if (answers.attending === "decline") {
      setAnswers(DECLINE_ANSWERS);
      setStep(SUMMARY_STEP);
      setResumeFromDeclineSummary(false);
    } else {
      setResumeFromDeclineSummary(false);
      goForward(2);
    }
  };

  const handleQ1Back = () => {
    if (resumeFromDeclineSummary) {
      setStep(SUMMARY_STEP);
      setResumeFromDeclineSummary(false);
      return;
    }
    // normal behaviour: if editMode go summary, else back to guest select
    if (editMode) setStep(SUMMARY_STEP);
    else handleBackToGuests();
  };

  return {
    // state
    step,
    selectedGuest,
    answers,
    summaryView,
    editMode,
    isDirty,

    // setters (some needed by parent)
    setStep,
    setAnswers,
    setSummaryView,

    // actions
    handleBackToGuests,
    handleSelectGuest,
    handleEditFromSummary,
    goForward,

    // Q1 special flow
    handleQ1Next,
    handleQ1Back,

    // updaters
    updateAttendanceAnswer,
    updateEventsAnswer,
    updateStarterAnswer,
    updateMainAnswer,
    updateDietaryAnswer,
    updateHotelAnswer,
    updateTransportAnswer,
    updateEmailAnswer,
  };
}
