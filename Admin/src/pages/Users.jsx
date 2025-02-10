import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import "./Users.css";
const Users = ({ token }) => {
  const [customers, setCustomers] = useState([]);
  const [orderStats, setOrderStats] = useState({});

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const userRes = await axios.get(`${backendUrl}/api/user/get-users`);
        if (userRes.data.success) {
          setCustomers(userRes.data.users);
          fetchOrderStats(userRes.data.users);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    const fetchOrderStats = async (users) => {
      try {
        const stats = {};
        for (const user of users) {
          const res = await axios.post(
            `${backendUrl}/api/order/user-stats`,
            {
              userId: user._id,
            },
            { headers: { token } }
          );
          if (res.data.success) {
            stats[user._id] = res.data;
          }
        }
        setOrderStats(stats);
      } catch (error) {
        console.error("Error fetching order stats:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="customers-container">
      <h3 className="table-title">Customer Information</h3>
      <table className="customers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th># of Orders</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} className="customer-row">
              <td>{customer._id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phoneNumber}</td>
              <td>{orderStats[customer._id]?.totalOrders || 0}</td>
              <td>
                ₹{orderStats[customer._id]?.totalAmount.toFixed(2) || "0.00"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
