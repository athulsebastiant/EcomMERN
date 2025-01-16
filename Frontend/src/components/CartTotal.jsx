import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import "./CartTotal.css";
const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontSize: "1.75rem", lineHeight: "2.25rem" }}>
        <h4>CART TOTALS</h4>
      </div>
      <div className="mainCarTTdiv">
        <div className="STot">
          <p>Subtotal</p>
          <p>
            {currency}
            {getCartAmount()}.00
          </p>
        </div>
        <hr />
        <div className="ShipFee">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="Tot">
          <b>Total</b>
          <b>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
