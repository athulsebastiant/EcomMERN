import React, { useContext, useEffect, useState } from "react";
import "./Orders.css";
import { ShopContext } from "../context/ShopContext";
import { backendUrl } from "../App";
import axios from "axios";
const Orders = () => {
  const { token, currency, productList } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/user-orders",
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;

            item["payment"] = order.payment;

            item["paymentMethod"] = order.paymentMethod;

            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p className="orders-subheader">
          Showing your {Math.min(orderData.length)} most recent orders
        </p>
      </div>

      <div className="orders-list">
        {orderData.map((item, index) => (
          <div key={index} className="order-item">
            <div className="order-image-container">
              <img
                src={item.image[0]}
                alt={item.name}
                className="order-image"
              />
              <span className="status-badge">{item.status}</span>
            </div>

            <div className="order-details">
              <div className="order-title">
                <h3>{item.name}</h3>
                <p className="order-number">Order #ORD-{item._id}</p>
              </div>

              <div className="order-info">
                <div className="info-item">
                  <span className="info-label">Price:</span>
                  <span className="info-value">
                    {currency}
                    {item.price}
                  </span>
                </div>

                <div className="info-item">
                  <span className="info-label">Quantity:</span>
                  <span className="info-value">{item.quantity}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Payment Method:</span>
                  <span className="info-value">{item.paymentMethod}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Date:</span>
                  <span className="info-value">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
