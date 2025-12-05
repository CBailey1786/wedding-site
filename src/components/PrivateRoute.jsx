import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { loading, isLoggedIn } = useAuth();

  if (loading) return <p>Loading…</p>;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
