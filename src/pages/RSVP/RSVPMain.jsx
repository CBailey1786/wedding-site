import { useEffect, useState } from "react";
import RSVPHeader from "./RSVPHeader";
import "./RSVPMain.css"
import pencil from '../../assets/pencil.svg';
import rightArrow from '../../assets/right-arrow.svg';




async function logout() {
    await fetch("/.netlify/functions/logout", {
        method: "POST",
    });

    // Then redirect to login or home
    window.location.href = "/login";
}

export default function RSVP() {
    const [party, setParty] = useState(null);
    const [loading, setLoading] = useState(true);



    function completed_rsvp(g) {
        if (g.has_RSVP) {
            return <div className = "guest complete">
                <p className = "guest_name complete">{g.first_name} {g.last_name}</p>
                <div className = "guest_button light"><img className = "guest_symbol dark" src={pencil} alt="edit rsvp" /></div>
                </div>
        }
    }

    function not_completed_rsvp(g) {
        if (!g.has_RSVP) {
            return <div className = "guest incomplete">
                <p className = "guest_name incomplete">{g.first_name} {g.last_name}</p>
                <div className = "guest_button dark"><img className = "guest_symbol light" src={rightArrow} alt="go to rsvp" /></div>
                </div>
        }
    }


    useEffect(() => {
        async function load() {
            const res = await fetch("/.netlify/functions/me");
            if (res.status === 401) {
                // not logged in
                window.location.href = "/login";
                return;
            }

            if (res.ok) {
                const json = await res.json();
                setParty(json);
                console.log(json)

            }
            setLoading(false);
        }
        load();
    }, []);




    if (loading) return <p>Loading…</p>;
    if (!party) return <p>Could not load your RSVP details.</p>;

                    const completed = party.guests?.filter(g => completed_rsvp(g));
                const incomplete = party.guests?.filter(g => not_completed_rsvp(g));

    return (
        <main className = "RSVPMain">
            <RSVPHeader />
            <p>Please select the guest for whom you would like to RSVP:</p>

            {completed?.length > 0 && (
                <>
                    <h2>RSVP Complete</h2>
                    <div className = "guest_list">
                        {completed.map(g => completed_rsvp(g))}
                    </div>
                </>
            )}

            {incomplete?.length > 0 && (
                <>
                    <h2>RSVP Incomplete</h2>
                    <div className = "guest_list">
                        {incomplete.map(g => not_completed_rsvp(g))}
                    </div>
                </>
            )}




            <button onClick={logout}>Log out</button>
        </main>
    );
}
