import React from "react";
import "./PrivacyPolicy.css"; // Import the CSS file

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-heading">Privacy Policy</h1>
      <p className="privacy-date">Last updated: February 2025</p>

      <section className="privacy-section">
        <h2>1. Introduction</h2>
        <p>
          Welcome to <strong>Electronics Corp</strong>. Your privacy is
          important to us, and we are committed to protecting your personal
          data. This Privacy Policy outlines how we collect, use, and safeguard
          your information when you visit our website.
        </p>
      </section>

      <section className="privacy-section">
        <h2>2. Information We Collect</h2>
        <p>
          We may collect the following types of information when you use our
          website:
        </p>
        <ul>
          <li>Personal Information (Name, Email, Address, Phone Number)</li>
          <li>Payment Information (when making purchases)</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>3. How We Use Your Information</h2>
        <p>We use the collected information for:</p>
        <ul>
          <li>Processing orders and payments</li>
          <li>Improving our website and services</li>
          <li>Ensuring website security and fraud prevention</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>4. Sharing Your Information</h2>
        <p>
          We do not sell or rent your personal information. However, we may
          share it with third-party service providers for payment processing,
          order fulfillment, and analytics.
        </p>
      </section>

      <section className="privacy-section">
        <h2>5. Security Measures</h2>
        <p>
          We implement industry-standard security measures to protect your data.
          However, no online transaction is 100% secure, so please use our
          services responsibly.
        </p>
      </section>

      <section className="privacy-section">
        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access, update, or delete your personal information</li>
          <li>Request a copy of your data</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about our Privacy Policy, contact us at:
        </p>
        <p>Email: athulsebastiant@gmail.com</p>
        <p>Phone: +91 8921866268</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
