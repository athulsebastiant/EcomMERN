import React from "react";
import { useState, useEffect } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import pack from "../assets/package.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import "./Orders.css";
const Orders = ({ token }) => {
  const currency = "$";
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: event.target.value,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast("Updated Order Status");
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="orders-container">
      <h3>Order Page</h3>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Product</th>
            <th>Customer Details</th>
            <th>Order Info</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="order-row">
              <td>
                <b>{order._id}</b>
              </td>
              <td className="product-cell">
                <img src={pack} alt="" height={50} width={50} />
                <div className="product-items">
                  {order.items.map((item, itemIndex) => (
                    <p key={itemIndex}>
                      {item.name} x {item.quantity} <span>{item.size}</span>
                    </p>
                  ))}
                </div>
              </td>
              <td className="customer-cell">
                <p>{order.address.firstName + " " + order.address.lastName}</p>
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.pin}
                </p>
                <p>{order.address.phone}</p>
              </td>
              <td className="order-info-cell">
                <p>Items: {order.items.length}</p>
                <p>Payment Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </td>
              <td className="total-cell" width={"100px"}>
                {currency} {order.amount}
              </td>
              <td className="status-cell">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      label="Status"
                      value={order.status}
                      onChange={(event) => statusHandler(event, order._id)}
                    >
                      <MenuItem value={"Order Placed"}>Order Placed</MenuItem>
                      <MenuItem value={"Packing"}>Packing</MenuItem>
                      <MenuItem value={"Shipped"}>Shipped</MenuItem>
                      <MenuItem value={"Out for delivery"}>
                        Out for delivery
                      </MenuItem>
                      <MenuItem value={"Delivered"}>Delivered</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
