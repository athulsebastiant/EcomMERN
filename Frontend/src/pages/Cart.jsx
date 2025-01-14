import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";
const Cart = () => {
  //const [list, setList] = useState([]);
  const { currency, cartItems, productList } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  // const fetchList = async () => {
  //   try {
  //     const response = await axios.get(backendUrl + "/api/product/list");
  //     //console.log(backendUrl);
  //     if (response.data.success) {
  //       // Store products with category IDs only

  //       setList(response.data.products);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };
  // useEffect(() => {
  //   fetchList();
  // }, []);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      tempData.push({
        _id: items,
        quantity: cartItems[items],
      });
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
                  style={{ width: "4rem" }}
                />
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: "500" }}>
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
                className="qtyBox"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
