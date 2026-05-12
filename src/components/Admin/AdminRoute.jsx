import { Navigate } from "react-router-dom";
import { useParty } from "../Party/PartyContext";

export default function AdminRoute({ children }) {
  const { party } = useParty();

  // If no party loaded yet, you could show loader
  if (!party) return null;

  if (!party.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
}