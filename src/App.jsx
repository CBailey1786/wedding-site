import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';

import AuthenticatedLayout from "./layouts/AuthenticatedLayout";

import PrivateRoute from "./components/PrivateRoute";
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import OurLondon from "./pages/OurLondon/OurLondon";  
import Hotels from './pages/Hotels';
import Venue from './pages/Venue';
import Travel from './pages/Travel';
import RSVP from './pages/RSVP/RSVPMain';
import Login from "./pages/Login/Login";


function App() {
  return (

    <Router>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED PAGES (with navbar) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AuthenticatedLayout>
                <Home />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/OurLondon"
          element={
            <PrivateRoute>
              <AuthenticatedLayout>
                <OurLondon />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/Hotels"
          element={
            <PrivateRoute>
              <AuthenticatedLayout>
                <Hotels />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/Venue"
          element={
            <PrivateRoute>
              <AuthenticatedLayout>
                <Venue />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/Travel"
          element={
            <PrivateRoute>
              <AuthenticatedLayout>
                <Travel />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/RSVP"
          element={
            <PrivateRoute>
              <AuthenticatedLayout>
                <RSVP />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />


      </Routes>
    </Router>
  );
}

export default App;

