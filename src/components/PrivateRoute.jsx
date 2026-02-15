import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { loading, isLoggedIn } = useAuth();

  if (loading) return <h3>Loading…</h3>;

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return children;
}
