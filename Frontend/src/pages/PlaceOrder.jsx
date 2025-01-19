import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import CartTotal from "../components/CartTotal";
import image from "../assets/Razorpay_logo.png";
import "./PlaceOrder.css";
import Button from "@mui/material/Button";
import { ShopContext } from "../context/ShopContext";
const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const select = "payment-option-selected";
  const { navigate } = useContext(ShopContext);
  return (
    <div className="place-order-container">
      <div className="order-content">
        {/* Delivery Information Section */}
        <div className="delivery-section">
          <div className="section-header">
            <h4>DELIVERY INFORMATION</h4>
          </div>
          <div className="form-row">
            <TextField
              id="firstName"
              label="First Name"
              variant="filled"
              className="form-field"
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="filled"
              className="form-field"
            />
          </div>
          <div className="form-row">
            <TextField
              id="street"
              label="Street"
              variant="filled"
              className="form-field full-width"
            />
          </div>
          <div className="form-row">
            <TextField
              id="city"
              label="City"
              variant="filled"
              className="form-field"
            />
            <TextField
              id="state"
              label="State"
              variant="filled"
              className="form-field"
            />
            <TextField
              id="pin"
              label="PIN"
              type="number"
              variant="filled"
              className="form-field"
            />
          </div>
          <div className="form-row">
            <TextField
              id="phone"
              label="Phone"
              type="number"
              variant="filled"
              className="form-field full-width"
            />
          </div>
        </div>

        {/* Payment and Total Section */}
        <div className="payment-total-section">
          <div className="cart-total">
            <CartTotal />
          </div>
          <div className="payment-section">
            <div className="section-header">
              <h4>PAYMENT METHOD</h4>
            </div>
            <div className="payment-options">
              {/* Payment options will go here */}
              <div
                onClick={() => setMethod("razorpay")}
                className={`payment-option-single ${
                  method === "razorpay" ? select : ""
                }`}
              >
                <img src={image} alt="" width={"94.75px"} height={"20px"} />
              </div>
              <div
                onClick={() => setMethod("cod")}
                className={`payment-option-single ${
                  method === "cod" ? select : ""
                }`}
              >
                <p>CASH ON DELIVERY</p>
              </div>
              <Button onClick={() => navigate("/orders")} variant="contained">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
