
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


async function logout() {
    await fetch("/.netlify/functions/logout", {
        method: "POST",
    });
    window.location.href = "/login";
}



export default function RSVP() {
    const [party, setParty] = useState(null);
    const [loading, setLoading] = useState(true);

    const [step, setStep] = useState(0); // 0 = guest select, 1+ = later screens
    const [selectedGuest, setSelectedGuest] = useState(false);

    const [answers, setAnswers] = useState({});

    console.log(answers)

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

    useEffect(() => {
        async function load() {
            const res = await fetch("/.netlify/functions/me");
            if (res.status === 401) {
                window.location.href = "/login";
                return;
            }

            if (res.ok) {
                const json = await res.json();
                setParty(json);
            }
            setLoading(false);
        }
        load();
    }, []);

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
                    onNext={() => setStep(2)}
                    onBack={handleBackToGuests}
                />
            )}

            {step === 2 && selectedGuest && (
                <RSVPQuestion2
                    guest={selectedGuest}
                    value={answers[selectedGuest.guest_id]?.events ?? []}
                    onChange={(eventsArray) =>
                        updateEventsAnswer(selectedGuest.guest_id, eventsArray)
                    }
                    onBack={() => setStep(1)}
                    onNext={() => setStep(3)} // or submit at this point
                />
            )}

            {step === 3 && selectedGuest && (
                <RSVPQuestion3
                    guest={selectedGuest}
                    value={answers[selectedGuest.guest_id]?.starter ?? []}
                    onChange={(answer) =>
                        updateStarterAnswer(selectedGuest.guest_id, answer)
                    }
                    onBack={() => setStep(2)}
                    onNext={() => setStep(4)} // or submit at this point
                />
            )}

            {step === 4 && selectedGuest && (
                <RSVPQuestion4
                    guest={selectedGuest}
                    value={answers[selectedGuest.guest_id]?.main ?? []}
                    onChange={(answer) =>
                        updateMainAnswer(selectedGuest.guest_id, answer)
                    }
                    onBack={() => setStep(3)}
                    onNext={() => setStep(5)} // or submit at this point
                />
            )}

            {step === 5 && selectedGuest && (
                <RSVPQuestion5
                    guest={selectedGuest}
                    value={answers[selectedGuest.guest_id]?.dietary}
                    onChange={(dietaryValue) =>
                        updateDietaryAnswer(selectedGuest.guest_id, dietaryValue)
                    }
                    onBack={() => setStep(4)}
                    onNext={() => setStep(6)} // or submit
                />
            )}

            {step === 6 && selectedGuest && (
  <RSVPQuestion6
    guest={selectedGuest}
    value={answers[selectedGuest.guest_id]?.hotel}
    onChange={(hotelValue) =>
      updateHotelAnswer(selectedGuest.guest_id, hotelValue)
    }
    onBack={() => setStep(5)}
    onNext={() => setStep(7)} // or submit
  />
)}

            <button onClick={logout}>Log out</button>
        </main>
    );
}
