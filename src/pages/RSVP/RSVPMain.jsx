
import { useEffect, useState } from "react";
import "./RSVPMain.css";
import RSVPHeader from "./RSVPHeader"
import GuestSelect from "./GuestSelect"; // adjust path if needed
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






export default function RSVP() {
const toast = useToast();
        useEffect(() => {
    (async () => {
        try {
        await reloadParty();
        } finally {
        setLoading(false);
        }
    })();
    }, []);

    const SUMMARY_STEP = 9;

    const [editMode, setEditMode] = useState(false);
    const [editReturnStep, setEditReturnStep] = useState(SUMMARY_STEP);


    const [party, setParty] = useState(null);
    const [loading, setLoading] = useState(true);

    const [step, setStep] = useState(0); // 0 = guest select, 1+ = later screens
    const [selectedGuest, setSelectedGuest] = useState(false);

    const [answers, setAnswers] = useState({});

    async function reloadParty() {
  const res = await fetch("/.netlify/functions/me", {
    credentials: "include",
  });

  if (res.status === 401) {
    window.location.href = "/login";
    return null;
  }

  if (!res.ok) throw new Error("Failed to load party");

  const json = await res.json();
  setParty(json);
  return json;
}

    function updateAttendanceAnswer(guestId, answer) {
        setAnswers((prev) => ({
            ...prev,
            [guestId]: {
                ...(prev[guestId] || {}),
                attending: answer, // "accept" | "decline"
            },
        }));
    }

    function updateEventsAnswer(guestId, eventsArray) {
        setAnswers((prev) => ({
            ...prev,
            [guestId]: {
                ...(prev[guestId] || {}),
                events: eventsArray,
            },
        }));
    }

    function updateStarterAnswer(guestId, answer) {
        setAnswers((prev) => ({
            ...prev,
            [guestId]: {
                ...(prev[guestId] || {}),
                starter: answer,
            },
        }));
    }

    function updateMainAnswer(guestId, answer) {
        setAnswers((prev) => ({
            ...prev,
            [guestId]: {
                ...(prev[guestId] || {}),
                main: answer,
            },
        }));
    }

    function updateDietaryAnswer(guestId, dietaryValue) {
        setAnswers((prev) => ({
            ...prev,
            [guestId]: {
                ...(prev[guestId] || {}),
                dietary: dietaryValue,
            },
        }));
    }

    function updateHotelAnswer(guestId, hotelValue) {
        setAnswers((prev) => ({
            ...prev,
            [guestId]: {
                ...(prev[guestId] || {}),
                hotel: hotelValue,
            },
        }));
    }

    function updateTransportAnswer(guestId, answer) {
        setAnswers((prev) => ({
            ...prev,
            [guestId]: {
                ...(prev[guestId] || {}),
                transport: answer,
            },
        }));
    }

    function updateEmailAnswer(guestId, email) {
        setAnswers(prev => ({
            ...prev,
            [guestId]: {
                ...(prev[guestId] || {}),
                email,
            },
        }));
    }
    // somewhere at top-level
    const [submitting, setSubmitting] = useState(false);

    // map summary row keys → step numbers
    const editStepMap = {
        rsvp: 1,
        events: 2,
        starter: 3,
        main: 4,
        dietary: 5,
        hotel: 6,
        transport: 7,
        email: 8,
        summary: 9,
    };

    function handleEditFromSummary(key) {
    const targetStep = editStepMap[key];
    if (targetStep != null) {
        setEditMode(true);
        setEditReturnStep(SUMMARY_STEP);
        setStep(targetStep);
    }
    }

    const goForward = (normalNextStep) => {
    if (editMode) {
        setStep(editReturnStep);     // back to summary
        setEditMode(false);          // exit edit mode
    } else {
        setStep(normalNextStep);     // normal flow
    }
    };



    if (loading) return <p>Loading…</p>;
    if (!party) return <p>Could not load your RSVP details.</p>;

    const handleSelectGuest = (guest) => {
        setSelectedGuest(guest);
        setStep(1); // move to the next screen in your flow
    };

    const handleBackToGuests = () => {
        setStep(0);
        setSelectedGuest(false);
    };

async function handleSubmit(e) {
  if (e?.preventDefault) e.preventDefault();
  setSubmitting(true);

  try {
    const res = await fetch("/.netlify/functions/submitRSVP", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // important if your login uses cookies
      body: JSON.stringify({
        guest_id: selectedGuest.guest_id,
        answers: answers[selectedGuest.guest_id], // submit one guest at a time
        // OR: answers, // if you want to submit all guests
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
        await reloadParty();
  setStep(0);
  setSelectedGuest(false);
  toast.success("RSVP created successfully");

  // optional: if you want a clean slate per guest
  // setAnswers(prev => ({
  //   ...prev,
  //   [selectedGuest.guest_id]: prev[selectedGuest.guest_id],
  // }));

  // optional UX: scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      console.error(data);
      // show a friendly error
      // setError(data?.error ?? "Submission failed");
    }
  } catch (err) {
    console.error(err);
    // setError("Network error");
  } finally {
    setSubmitting(false);
  }
}



    return (
        <main className="RSVPMain">
            <RSVPHeader guest={selectedGuest} />
            {step === 0 && (
                <>
                    <p>Please select the guest for whom you would like to RSVP:</p>
                    <GuestSelect guests={party.guests} onSelectGuest={handleSelectGuest} />
                </>
                
            )}

            {step === 1 && selectedGuest && (
                <RSVPQuestion1
                    guest={selectedGuest}
                    value={answers[selectedGuest.guest_id]?.attending ?? null}
                    onChange={(answer) =>
                        updateAttendanceAnswer(selectedGuest.guest_id, answer)
                    }
                onNext={() => goForward(2)}
                nextLabel={editMode ? "Update" : "Next"}
                onBack={editMode ? () => setStep(SUMMARY_STEP) : handleBackToGuests}
                />
            )}

            {step === 2 && selectedGuest && (
                <RSVPQuestion2
                    guest={selectedGuest}
                    value={answers[selectedGuest.guest_id]?.events ?? []}
                    onChange={(eventsArray) =>
                        updateEventsAnswer(selectedGuest.guest_id, eventsArray)
                    }
                    onNext={() => goForward(3)}
                    nextLabel={editMode ? "Update" : "Next"}
                    onBack={editMode ? () => setStep(SUMMARY_STEP) :() =>  setStep(1)}
                />
            )}

            {step === 3 && selectedGuest && (
                <RSVPQuestion3
                    guest={selectedGuest}
                    value={answers[selectedGuest.guest_id]?.starter ?? []}
                    onChange={(answer) =>
                        updateStarterAnswer(selectedGuest.guest_id, answer)
                    }
                    onNext={() => goForward(4)}
                    nextLabel={editMode ? "Update" : "Next"}
                    onBack={editMode ? () => setStep(SUMMARY_STEP) :() =>  setStep(2)}
                />
            )}

            {step === 4 && selectedGuest && (
                <RSVPQuestion4
                    guest={selectedGuest}
                    value={answers[selectedGuest.guest_id]?.main ?? []}
                    onChange={(answer) =>
                        updateMainAnswer(selectedGuest.guest_id, answer)
                    }
                    onNext={() => goForward(5)}
                    nextLabel={editMode ? "Update" : "Next"}
                    onBack={editMode ? () => setStep(SUMMARY_STEP) :() =>  setStep(3)}
                />
            )}

            {step === 5 && selectedGuest && (
                <RSVPQuestion5
                    guest={selectedGuest}
                    value={answers[selectedGuest.guest_id]?.dietary}
                    onChange={(dietaryValue) =>
                        updateDietaryAnswer(selectedGuest.guest_id, dietaryValue)
                    }
                    onNext={() => goForward(6)}
                    nextLabel={editMode ? "Update" : "Next"}
                    onBack={editMode ? () => setStep(SUMMARY_STEP) :() =>  setStep(4)}
                />
            )}

            {step === 6 && selectedGuest && (
                <RSVPQuestion6
                    guest={selectedGuest}
                    value={answers[selectedGuest.guest_id]?.hotel}
                    onChange={(hotelValue) =>
                        updateHotelAnswer(selectedGuest.guest_id, hotelValue)
                    }
                    onNext={() => goForward(7)}
                    nextLabel={editMode ? "Update" : "Next"}
                    onBack={editMode ? () => setStep(SUMMARY_STEP) :() =>  setStep(5)}
                />
            )}

            {step === 7 && selectedGuest && (
                <RSVPQuestion7
                    guest={selectedGuest}
                    value={answers[selectedGuest.guest_id]?.transport ?? null}
                    onChange={(answer) =>
                        updateTransportAnswer(selectedGuest.guest_id, answer)
                    }
                    onNext={() => goForward(8)}
                    nextLabel={editMode ? "Update" : "Next"}
                    onBack={editMode ? () => setStep(SUMMARY_STEP) : () => setStep(6)}
                />
            )}

            {step === 8 && selectedGuest && (
                <RSVPQuestion8
                    guest={selectedGuest}
                    value={answers[selectedGuest.guest_id]?.email ?? ""}
                    onChange={(email) => updateEmailAnswer(selectedGuest.guest_id, email)}
                    onNext={() => goForward(9)}
                    nextLabel={editMode ? "Update" : "Next"}
                    onBack={editMode ? () => setStep(SUMMARY_STEP) : () => setStep(7)}
                />
            )}
            {step === 9 && selectedGuest && (
                <RSVPSummary
                    guest={selectedGuest}
                    answers={answers[selectedGuest.guest_id]}
                    onEdit={handleEditFromSummary}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                />
            )}


        </main>
    );
}
