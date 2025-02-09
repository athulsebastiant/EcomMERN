import React, { useContext, useState } from "react";
import "./Navbar.css";
import elcorpLogo from "../assets/elcorp.png";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ShopContext } from "../context/ShopContext";
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "profile") {
      navigate("/user-profile");
    } else if (value === "orders") {
      navigate("/orders");
    } else if (value === "logout") {
      logout();
    }
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".person-icon-container")) {
      setIsDropdownOpen(false);
    }
  };

  // Add event listener to close dropdown when clicking outside
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };
  return (
    <div className="MainNav">
      <Link to="/">
        <img className="logo" src={elcorpLogo} alt="logo" />
      </Link>
      <ul className="PageList">
        <NavLink to="/" className="NavlinkNB">
          <p>HOME</p>
          <hr className="hrNB" />
        </NavLink>
        <NavLink to="/all-products" className="NavlinkNB">
          <p>ALL PRODUCTS</p>
          <hr className="hrNB" />
        </NavLink>
      </ul>

      <div className="SearchButton">
        {/* <SearchIcon sx={{ cursor: "pointer" }} /> */}
        {token && (
          <div className="person-icon-container">
            <PersonIcon
              sx={{ cursor: "pointer", color: "#007BFF" }}
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div
                  onClick={() => navigate("/user-profile")}
                  className="dropdown-item"
                >
                  My Profile
                </div>
                <div
                  onClick={() => navigate("/orders")}
                  className="dropdown-item"
                >
                  My Orders
                </div>
                <div onClick={logout} className="dropdown-item logout">
                  Logout
                </div>
              </div>
            )}
          </div>
        )}
        {token && (
          <Link to="/cart" style={{ position: "relative" }}>
            <ShoppingCartIcon sx={{ color: "#007BFF" }} />
            <p className="cartCount">{getCartCount()}</p>
          </Link>
        )}
      </div>
      {!token && (
        <Link to="/cart" style={{ color: "green", textDecoration: "none" }}>
          <b>Login</b>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
