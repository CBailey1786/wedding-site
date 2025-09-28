import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Venue from './pages/Venue';

// TEMP: add stubs until you create these pages
const Contact = () => <div>Contact</div>;
const Blogs = () => <div>Blogs</div>;
const SignUp = () => <div>Sign Up</div>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Hotels" element={<Hotels />} />
        <Route path="/Venue" element={<Venue />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
