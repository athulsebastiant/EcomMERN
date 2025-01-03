import React from "react";
import "./Navbar.css";
import elcorpLogo from "../assets/elcorp.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="MainNav">
      <img className="logo" src={elcorpLogo} alt="logo" />
      <ul className="PageList"></ul>
    </div>
  );
};

export default Navbar;
