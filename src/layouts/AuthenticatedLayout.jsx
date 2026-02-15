// layouts/AuthenticatedLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function AuthenticatedLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
