import React, { useContext } from "react";
import "./Orders.css";
import { ShopContext } from "../context/ShopContext";
const Orders = () => {
  const { currency, productList } = useContext(ShopContext);
  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p className="orders-subheader">
          Showing your {Math.min(productList.length, 3)} most recent orders
        </p>
      </div>

      <div className="orders-list">
        {productList.slice(0, 3).map((item, index) => (
          <div key={index} className="order-item">
            <div className="order-image-container">
              <img
                src={item.image[0]}
                alt={item.name}
                className="order-image"
              />
              <span className="status-badge">Delivered</span>
            </div>

            <div className="order-details">
              <div className="order-title">
                <h3>{item.name}</h3>
                <p className="order-number">Order #ORD-{2024000 + index}</p>
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
                  <span className="info-value">1</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Date:</span>
                  <span className="info-value">25 July 2025</span>
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
