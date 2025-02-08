import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";
import CartTotal from "../components/CartTotal";
import Button from "@mui/material/Button";
const Cart = () => {
  const { currency, cartItems, productList, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [hasCartError, setHasCartError] = useState(false);
  useEffect(() => {
    if (productList.length > 0) {
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
    }
  }, [cartItems, productList]);

  // useEffect(() => {
  //   console.log("List state:", list);
  // }, [list]);

  useEffect(() => {
    console.log("CartData state:", cartData);
  }, [cartData]);

  const handleQuantityChange = async (itemId, value) => {
    if (value === "" || value === "0") return;

    try {
      await updateQuantity(itemId, Number(value));
      setHasCartError(false); // Clear error state on successful update
    } catch (error) {
      setHasCartError(true); // Set error state if update fails
    }
  };
  return (
    <div className="CartMainDiv">
      <div className="CartSecDiv">
        <h4 style={{ color: "white" }}>YOUR CART</h4>
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
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    {productData.name}
                  </p>
                  <div className="otherProDets">
                    <p style={{ color: "white" }}>
                      {currency}
                      {productData.price}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                className="qtyBox"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <DeleteIcon
                onClick={() => updateQuantity(item._id, 0)}
                sx={{ marginRight: "1rem", cursor: "pointer", color: "red " }}
              ></DeleteIcon>
            </div>
          );
        })}
      </div>
      <div className="forTots">
        <div style={{ width: "100%" }}>
          <CartTotal />
          <div style={{ width: "100%", textAlign: "end" }}></div>
          <Button
            onClick={(e) => {
              if (hasCartError) {
                e.preventDefault();
                toast.error("Please fix cart errors before proceeding");
                return;
              }
              navigate("/place-order");
            }}
            disabled={hasCartError || cartData.length === 0}
            variant="contained"
            sx={{
              width: "275px",
              marginLeft: "74.5rem",
              marginTop: "2rem",
              /* 32px */ marginBottom: "2rem",
              /* 32px */ paddingLeft: "2rem",
              /* 32px */ paddingRight: "2rem",
              /* 32px */ paddingTop: "0.75rem",
              /* 12px */ paddingBottom: "0.75rem" /* 12px */,
            }}
          >
            PROCEED TO CHECKOUT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
