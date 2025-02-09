import React from "react";
import "./ShippingPolicy.css"; // Import the CSS file

const ShippingPolicy = () => {
  return (
    <div className="shipping-container">
      <h1 className="shipping-heading">Shipping Policy</h1>
      <p className="shipping-date">Last updated: February 2024</p>

      <section className="shipping-section">
        <h2>1. Shipping Coverage</h2>
        <p>
          Electronics Corp operates exclusively in <b>India</b>. We do not offer
          international shipping at this time.
        </p>
      </section>

      <section className="shipping-section">
        <h2>2. Shipping Charges</h2>
        <p>
          A <b>flat delivery fee of ₹40</b> is applied to all orders, regardless
          of location within India.
        </p>
      </section>

      <section className="shipping-section">
        <h2>3. Estimated Delivery Time</h2>
        <ul>
          <li>
            <b>Metro Cities:</b> 3-5 business days
          </li>
          <li>
            <b>Tier 2 & 3 Citie:</b> 5-7 business days
          </li>
          <li>
            <b>Remote Locations:</b> 7-10 business days
          </li>
        </ul>
        <p>
          Delivery times may vary due to unforeseen circumstances such as
          weather, natural disasters, or logistical issues.
        </p>
      </section>

      <section className="shipping-section">
        <h2>4. Order Processing</h2>
        <p>
          Orders are processed within <b>24-48 hours</b> of being placed. Once
          your order is shipped, you will receive a tracking link via email or
          SMS.
        </p>
      </section>

      <section className="shipping-section">
        <h2>5. Courier Partners</h2>
        <p>
          We partner with trusted courier services such as{" "}
          <b>Blue Dart, DTDC, Delhivery and India Post</b> to ensure safe and
          timely delivery of your electronics.
        </p>
      </section>

      <section className="shipping-section">
        <h2>6. Delivery Attempts & Non-Delivery</h2>
        <p>
          Our courier partners will attempt delivery up to <b>two times</b>. If
          the package is undelivered after two attempts, it will be returned to
          us. In such cases:
        </p>
        <ul>
          <li>
            A refund (excluding the ₹40 delivery fee) will be processed, or
          </li>
          <li>You can request a re-shipment (additional charges may apply).</li>
        </ul>
      </section>

      <section className="shipping-section">
        <h2>7. Tracking Your Order</h2>
        <p>
          Once shipped, you can track your order using the <b>tracking ID </b>
          provided via email or SMS.
        </p>
      </section>

      <section className="shipping-section">
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions regarding shipping, feel free to contact us
          at:
        </p>
        <p>Email: athulsebastiant@gmail.com</p>
        <p>Phone: +91 8921866268</p>
      </section>
    </div>
  );
};

export default ShippingPolicy;
