import { useEffect, useMemo, useState } from "react";
import "./RSVPMain.css";
import RSVPHeader from "./RSVPHeader";
import GuestSelect from "./GuestSelect";
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

const DEFAULT_ANSWERS = {
    attending: null,
    events: [],
    starter: null,
    main: null,
    dietary: "",
    hotel: null,
    transport: null,
    email: "",
};

const DECLINE_ANSWERS = {
    ...DEFAULT_ANSWERS,
    attending: "decline",
    // choose your null/empty conventions:
    events: [],
    starter: null,
    main: null,
    dietary: null,     // IMPORTANT: set to null if you want DB overwritten to null
    hotel: null,
    transport: false,
    email: null,
};

// quick deep compare good enough for this data shape
const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export default function RSVP() {
    const toast = useToast();

    const SUMMARY_STEP = 9;

    const [party, setParty] = useState(null);
    const [loading, setLoading] = useState(true);

    const [step, setStep] = useState(0);
    const [selectedGuest, setSelectedGuest] = useState(null);

    // single-guest answers (current selection only)
    const [answers, setAnswers] = useState(DEFAULT_ANSWERS);

    // snapshot of saved answers when entering "review"
    const [originalAnswers, setOriginalAnswers] = useState(null);

    const [summaryView, setSummaryView] = useState("initial"); // "initial" | "review"
    const [editMode, setEditMode] = useState(false);
    const [editReturnStep, setEditReturnStep] = useState(SUMMARY_STEP);
    const [submitting, setSubmitting] = useState(false);
    const [resumeFromDeclineSummary, setResumeFromDeclineSummary] = useState(false);

    const isDirty = useMemo(() => {
        if (summaryView !== "review") return true; // initial flow: allow submit (you can add validation later)
        if (!originalAnswers) return true;        // if we don't have a snapshot, allow submit
        return !deepEqual(answers, originalAnswers);
    }, [answers, originalAnswers, summaryView]);

    useEffect(() => {
        (async () => {
            try {
                await reloadParty();
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    async function reloadParty() {
        const res = await fetch("/.netlify/functions/me", { credentials: "include" });

        if (res.status === 401) {
            window.location.href = "/login";
            return null;
        }
        if (!res.ok) throw new Error("Failed to load party");

        const json = await res.json();
        setParty(json);
        return json;
    }

    // --- update functions now update the single "answers" object ---
    const updateAttendanceAnswer = (answer) => setAnswers((prev) => ({ ...prev, attending: answer }));
    const updateEventsAnswer = (eventsArray) => setAnswers((prev) => ({ ...prev, events: eventsArray }));
    const updateStarterAnswer = (answer) => setAnswers((prev) => ({ ...prev, starter: answer }));
    const updateMainAnswer = (answer) => setAnswers((prev) => ({ ...prev, main: answer }));
    const updateDietaryAnswer = (dietaryValue) => setAnswers((prev) => ({ ...prev, dietary: dietaryValue }));
    const updateHotelAnswer = (hotelValue) => setAnswers((prev) => ({ ...prev, hotel: hotelValue }));
    const updateTransportAnswer = (answer) => setAnswers((prev) => ({ ...prev, transport: answer }));
    const updateEmailAnswer = (email) => setAnswers((prev) => ({ ...prev, email }));

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
    };

    function handleEditFromSummary(key) {
        const targetStep = editStepMap[key];
        if (targetStep == null) return;

        // SPECIAL CASE:
        // If currently declined, and they click edit RSVP from summary,
        // take them to Q1 but NOT in editMode (so they can continue to Q2 etc.)
        if (key === "rsvp" && answers?.attending === "decline") {
            setEditMode(false);                 // crucial: not a standard edit flow
            setResumeFromDeclineSummary(true);  // so Back returns to summary
            setStep(1);
            return;
        }

        // normal summary edits behave as before
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

    const DIET_KEYS = ["vegetarian", "vegan", "gluten_free", "lactose_free", "other"];

    function hydrateDietaryFromFood(food) {
        const hasReq = Boolean(food?.dietary_requirements);

        if (!hasReq) {
            return { hasRequirements: "no", options: [], other: "" };
        }

        const raw = (food?.dietary_requirements_details ?? "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

        // normalize (optional): treat "gluten free" as "gluten_free", etc.
        const normalize = (t) =>
            t.toLowerCase().replace(/\s+/g, "_"); // "gluten free" -> "gluten_free"

        const normalized = raw.map(normalize);

        const options = normalized.filter((t) => DIET_KEYS.includes(t));

        // "other" details = anything not one of the known option keywords
        const otherDetails = raw
            .map((s) => s.trim())
            .filter((s) => {
                const n = normalize(s);
                return !DIET_KEYS.includes(n); // keep free text like "No Mushrooms"
            })
            .join(", ");

        return {
            hasRequirements: "yes",
            options, // e.g. ["vegetarian","vegan"]
            other: otherDetails, // e.g. "No Mushrooms"
        };
    }

    function hydrateHotels(hotels) {
        const id = hotels?.hotel ?? null;

        if (id === "grosvenor" || id === "treehouse") {
            return {
                hotel: id,
                otherHotel: "",
            };
        }

        // anything else (including null) goes to "other"
        return {
            hotel: "other",
            otherHotel: id ?? "",
        };
    }


    function hydrateTransport(hotels) {
        if (hotels?.transport_required === true) return "accept";
        if (hotels?.transport_required === false) return "decline";
        return null;
    }

    function hydrateAttending(guest) {
        if (guest.RSVP === true) {return "accept"}
        else {return "decline"};
    }
    const handleBackToGuests = () => {
        setStep(0);
        setSelectedGuest(null);
        setEditMode(false);
        setSummaryView("initial");
        setOriginalAnswers(null);
        setAnswers(DEFAULT_ANSWERS);
        setResumeFromDeclineSummary(false);
    };

    // IMPORTANT: hydrate answers for a completed guest
    const handleSelectGuest = (guest, completed) => {
        console.log("Selected guest object:", guest);
        setSelectedGuest(guest);

        if (completed === "completed") {
            // hydrate from guest fields you already have (adjust if your payload uses different names)
            const EVENT_KEYS = [
                "attending_wedding",
                "attending_welcome_party",
                "attending_farewell_brunch",
                "attending_rehearsal_dinner",
            ];



            const hydrated = {
                attending: hydrateAttending(guest.events),

                events: EVENT_KEYS
                    .filter((key) => guest.events?.[key] === true)
                    .map((key) => key.replace("attending_", "")),

                starter: guest.food.starter ?? null,
                main: guest.food.main ?? null,
                dietary: hydrateDietaryFromFood(guest.food),
                hotel: hydrateHotels(guest.hotels) ?? null,
                transport: hydrateTransport(guest.hotels) ?? null,
                email: guest.events?.email ?? "",
            };

            console.log("hydrated",hydrated)
            setAnswers(hydrated);
            setOriginalAnswers(hydrated);     // snapshot for dirty-check
            setSummaryView("review");
            setStep(SUMMARY_STEP);
            return;
        }

        // incomplete guest: start fresh
        setAnswers(DEFAULT_ANSWERS);
        setOriginalAnswers(null);
        setSummaryView("initial");
        setStep(1);
    };

    async function handleSubmit(e) {
        if (e?.preventDefault) e.preventDefault();
        if (!selectedGuest) return;

        setSubmitting(true);
        console.log("submitting", answers)
        try {
            const res = await fetch("/.netlify/functions/submitRSVP", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    guest_id: selectedGuest.guest_id,
                    answers, // ✅ single object
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

    if (loading) return <p>Loading…</p>;
    if (!party) return <p>Could not load your RSVP details.</p>;

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
                    value={answers.attending ?? null}
                    onChange={updateAttendanceAnswer}
                    onNext={() => {
                        if (answers.attending === "decline") {
                            // only clear + jump when they press Next
                            setAnswers(DECLINE_ANSWERS);
                            setStep(SUMMARY_STEP);

                            // once they've confirmed decline, they're back in summary land
                            setResumeFromDeclineSummary(false);
                        } else {
                            // accept = continue questions normally
                            setResumeFromDeclineSummary(false);
                            goForward(2);
                        }
                    }}
                    nextLabel={editMode ? "Update" : "Next"}
                    onBack={() => {
                        // if they came from declined summary edit, go back to summary
                        if (resumeFromDeclineSummary) {
                            setStep(SUMMARY_STEP);
                            setResumeFromDeclineSummary(false);
                        } else {
                            // otherwise use your existing logic
                            editMode ? setStep(SUMMARY_STEP) : handleBackToGuests();
                        }
                    }}
                />
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
        </main>
    );
}
