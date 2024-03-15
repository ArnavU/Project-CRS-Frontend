import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import PdfList from "./components/PdfList";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
      <ThemeToggle />
    </>
  );
}

export default App;
