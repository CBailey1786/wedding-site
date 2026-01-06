
import flowers from '../../assets/heart-flower.svg';
import "./RSVPMain.css"

function getGuestDisplayName(guest) {
  if (!guest) return "";

  const name = `${guest.first_name ?? ""} ${guest.last_name ?? ""}`.trim();

  if (guest.is_plus_one) {
    return name || "Plus One";
  }

  return name || "Guest";
}

export default function RSVPHeader({guest}) {
 

  return (
    <header className="RSVPHeader">
        <img src={flowers} alt="flower-motif" />
        <div className = "headerText">
            <h1>RSVP</h1>
            {guest && <p>{getGuestDisplayName(guest)}</p>}
        </div>
        
        
    </header>
  );
}




