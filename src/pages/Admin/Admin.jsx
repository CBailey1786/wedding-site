import React, { useEffect } from "react";
import PageHeader from "../../layouts/PageHeader";
import { useAdminData } from "../../components/Admin/AdminContext";
import AdminDashboard from "./AdminDashboard";
import "./AdminDashboard.css";

export default function Admin() {
  const { responses, guestList, loading, error, reloadAllAdminData } = useAdminData();

  useEffect(() => {
    if ((!responses || !guestList) && !loading) {
      reloadAllAdminData();
    }
  }, [responses, reloadAllAdminData]);

  if (loading) return <div style={{ padding: 24 }}>Loading admin data…</div>;
  if (error) return <div style={{ padding: 24 }}>Error: {error.message}</div>;

  return (
    <div className="mainBody">
      <PageHeader pageName="Admin" />
      <AdminDashboard guestList={guestList} responses={responses} />
    </div>
  );
}