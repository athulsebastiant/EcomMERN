import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import CartTotal from "../components/CartTotal";
import image from "../assets/Razorpay_logo.png";
import "./PlaceOrder.css";
import Button from "@mui/material/Button";
import { ShopContext } from "../context/ShopContext";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const select = "payment-option-selected";
  const {
    navigate,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    productList,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      // Iterate through cartItems directly since each itemId maps to a quantity
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = structuredClone(
            productList.find((product) => product._id === itemId)
          );
          if (itemInfo) {
            itemInfo.quantity = cartItems[itemId];
            orderItems.push(itemInfo);
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        // API calls for COD
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place-order",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      // Consider adding error handling here
      console.error(error);
      toast.error(error.message);
    }
  };
  return (
    <form className="place-order-container" onSubmit={onSubmitHandler}>
      <div className="order-content">
        {/* Delivery Information Section */}
        <div className="delivery-section">
          <div className="section-header">
            <h4>DELIVERY INFORMATION</h4>
          </div>
          <div className="form-row">
            <TextField
              required
              id="firstName"
              label="First Name"
              variant="filled"
              className="form-field"
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
            />
            <TextField
              required
              id="lastName"
              label="Last Name"
              variant="filled"
              className="form-field"
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
            />
          </div>
          <div className="form-row">
            <TextField
              required
              id="street"
              label="Street"
              variant="filled"
              className="form-field full-width"
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
            />
          </div>
          <div className="form-row">
            <TextField
              required
              id="city"
              label="City"
              variant="filled"
              className="form-field"
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
            />
            <TextField
              required
              id="state"
              label="State"
              variant="filled"
              className="form-field"
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
            />
            <TextField
              required
              id="pin"
              label="PIN"
              type="number"
              variant="filled"
              className="form-field"
              onChange={onChangeHandler}
              name="pin"
              value={formData.pin}
            />
          </div>
          <div className="form-row">
            <TextField
              required
              id="phone"
              label="Phone"
              type="number"
              variant="filled"
              className="form-field full-width"
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
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
              <Button type="submit" variant="contained">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
