import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Remove from "./pages/Remove";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import CatAdd from "./pages/CatAdd";
import CatUpd from "./pages/CatEdit";
import CatEdit from "./pages/CatEdit";
import Home from "./pages/Home";
import Users from "./pages/Users";
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
                <Route path="/" element={<Home token={token} />}></Route>
                <Route path="/add" element={<Add token={token} />}></Route>
                <Route
                  path="/update"
                  element={<Update token={token} />}
                ></Route>
                <Route
                  path="/remove"
                  element={<Remove token={token} />}
                ></Route>
                <Route
                  path="/catAdd"
                  element={<CatAdd token={token} />}
                ></Route>
                <Route
                  path="/catEdit"
                  element={<CatEdit token={token} />}
                ></Route>
                <Route
                  path="/orders"
                  element={<Orders token={token} />}
                ></Route>
                <Route path="/users" element={<Users token={token} />}></Route>
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
