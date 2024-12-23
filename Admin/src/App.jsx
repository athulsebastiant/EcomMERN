import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Remove from "./pages/Remove";
import List from "./pages/List";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="MainPositioning">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken}></Navbar>
          <hr />
          <div className="Sidebar">
            <Sidebar></Sidebar>

            <div className="Something">
              <Routes>
                <Route path="/add" element={<Add token={token} />}></Route>
                <Route path="/list" element={<List token={token} />}></Route>
                <Route
                  path="/remove"
                  element={<Remove token={token} />}
                ></Route>
                <Route
                  path="/update"
                  element={<Update token={token} />}
                ></Route>
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
