// import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/login";
function App() {
  // let navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Intro />} />
      <Route path="/home" element={<Intro />} />
    </Routes>
  );
}

export default App;
