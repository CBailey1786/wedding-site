import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Venue from './pages/Venue';
import Travel from './pages/Travel';

// TEMP: add stubs until you create these pages
const SignUp = () => <div>Sign Up</div>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Hotels" element={<Hotels />} />
        <Route path="/Venue" element={<Venue />} />
        <Route path="/Travel" element={<Travel />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
