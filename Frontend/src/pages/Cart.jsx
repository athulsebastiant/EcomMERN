import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";
const Cart = () => {
  const { currency, cartItems, productList, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        tempData.push({
          _id: items,
          quantity: cartItems[items],
        });
      }
    }
    setCartData(tempData);
    // console.log("ts", tempData);
    // console.log("pl", productList);
  }, [cartItems]);

  // useEffect(() => {
  //   console.log("List state:", list);
  // }, [list]);

  useEffect(() => {
    console.log("CartData state:", cartData);
  }, [cartData]);

  return (
    <div className="CartMainDiv">
      <div className="CartSecDiv">
        <h4>YOUR CART</h4>
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = productList.find(
            (product) => product._id === item._id
          );

          return (
            <div key={index} className="forProduc">
              <div className="prodSecDiv">
                <img
                  src={productData.image[0]}
                  alt=""
                  style={{ width: "6rem", height: "6rem" }}
                />
                <div>
                  <p style={{ fontSize: "1rem", fontWeight: "500" }}>
                    {productData.name}
                  </p>
                  <div className="otherProDets">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(item._id, Number(e.target.value))
                }
                className="qtyBox"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <DeleteIcon
                onClick={() => updateQuantity(item._id, 0)}
                sx={{ marginRight: "1rem", cursor: "pointer", color: "red" }}
              ></DeleteIcon>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
