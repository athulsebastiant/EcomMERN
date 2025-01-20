import React, { useContext } from "react";
import "./Navbar.css";
import elcorpLogo from "../assets/elcorp.png";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ShopContext } from "../context/ShopContext";
const Navbar = () => {
  const { getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };
  return (
    <div className="MainNav">
      <img className="logo" src={elcorpLogo} alt="logo" />
      <ul className="PageList">
        <NavLink to="/" className="NavlinkNB">
          <p>HOME</p>
          <hr className="hrNB" />
        </NavLink>
        <NavLink to="/all-products" className="NavlinkNB">
          <p>ALL PRODUCTS</p>
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
        {token && (
          <div className="person-icon-container">
            <PersonIcon sx={{ cursor: "pointer" }} />
            <div class="dropdown-menu">
              {" "}
              <p className="dropdown-item">My Profile</p>{" "}
              <p onClick={() => navigate("/orders")} className="dropdown-item">
                Orders
              </p>{" "}
              <p onClick={logout} className="dropdown-item">
                Logout
              </p>{" "}
            </div>
          </div>
        )}

        <Link to="/cart" style={{ position: "relative" }}>
          <ShoppingCartIcon sx={{ color: "#007BFF" }} />
          <p className="cartCount">{getCartCount()}</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
