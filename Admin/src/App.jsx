import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Remove from "./pages/Remove";
import List from "./pages/List";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState("");

  return (
    <div className="MainPositioning">
      {token === "" ? (
        <Login />
      ) : (
        <>
          <Navbar></Navbar>
          <hr />
          <div className="Sidebar">
            <Sidebar></Sidebar>

            <div className="Something">
              <Routes>
                <Route path="/add" element={<Add />}></Route>
                <Route path="/list" element={<List />}></Route>
                <Route path="/remove" element={<Remove />}></Route>
                <Route path="/update" element={<Update />}></Route>
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
