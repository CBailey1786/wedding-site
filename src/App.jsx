import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";

import Home from "./pages/Home/Home";
import OurLondon from "./pages/OurLondon/OurLondon";
import Hotels from "./pages/Hotels/Hotels";
import Venue from "./pages/Venue";
import Travel from "./pages/Travel/Travel";
import RSVP from "./pages/RSVP/RSVPMain";
import FAQ from "./pages/FAQ/FAQ";
import DressCode from "./pages/DressCode/DressCode";

import PrivateRoute from "./components/PrivateRoute";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import { PartyProvider } from "./components/Party/PartyContext";

function ProtectedShell() {
  return (
    <PrivateRoute>
      <PartyProvider>
        <AuthenticatedLayout />
      </PartyProvider>
    </PrivateRoute>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED */}
        <Route element={<ProtectedShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/OurLondon" element={<OurLondon />} />
          <Route path="/Hotels" element={<Hotels />} />
          <Route path="/Venue" element={<Venue />} />
          <Route path="/Travel" element={<Travel />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/DressCode" element={<DressCode />} />
          <Route path="/RSVP" element={<RSVP />} />
        </Route>
      </Routes>
    </Router>
  );
}
