import React from "react";
import "./Navbar.css";
import elcorpLogo from "../assets/elcorp.png";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Navbar = () => {
  return (
    <div className="MainNav">
      <img className="logo" src={elcorpLogo} alt="logo" />
      <ul className="PageList">
        <NavLink to="/" className="NavlinkNB">
          <p>HOME</p>
          <hr className="hrNB" />
        </NavLink>
        <NavLink to="/a" className="NavlinkNB">
          <p>Home2</p>
          <hr className="hrNB" />
        </NavLink>
        <NavLink to="/b" className="NavlinkNB">
          <p>Home3</p>
          <hr className="hrNB" />
        </NavLink>
        <NavLink to="/c" className="NavlinkNB">
          <p>Home4</p>
          <hr className="hrNB" />
        </NavLink>
      </ul>

      <div className="SearchButton">
        <SearchIcon sx={{ cursor: "pointer" }} />
        <div className="person-icon-container">
          <PersonIcon sx={{ cursor: "pointer" }} />
          <div class="dropdown-menu">
            {" "}
            <p className="dropdown-item">My Profile</p>{" "}
            <p className="dropdown-item">Orders</p>{" "}
            <p className="dropdown-item">Logout</p>{" "}
          </div>
        </div>
        <Link to="/cart" style={{ position: "relative" }}>
          <ShoppingCartIcon sx={{ color: "#007BFF" }} />
          <p className="cartCount">7</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
