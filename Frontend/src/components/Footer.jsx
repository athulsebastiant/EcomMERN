import React from "react";
import elcorpLogo from "../assets/elcorp.png";
import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/">
            <img src={elcorpLogo} alt="Electronics Corp Logo" />
          </Link>
          <p>
            Electronics Corp - The one-stop shop for all your electronic needs.
          </p>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <ul className="footer-links">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/all-products">
              <li>All Products</li>
            </Link>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Get in Touch</h3>
          <ul className="footer-links footer-contact">
            <li>+91 6282628500</li>
            <li>athulsebastiant@gmail.com</li>
          </ul>
        </div>

        <div className="footer-copyright">
          <p>Copyright 2025 © Electronics Corp - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
