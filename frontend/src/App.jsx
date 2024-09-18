import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Welcome from "./components/Welcome/Welcome";
import Books from "./components/Books/Books";
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/books" element={<Books />} />
        {/* yanlış rotalarda anasayfaya yonlendirme */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
