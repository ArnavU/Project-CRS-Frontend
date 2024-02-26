import { useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";

function App() {
	return (
    <>
		<Router>
			<Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<Admin />} />

      </Routes>
		</Router>
    </>
	);
}

export default App;
