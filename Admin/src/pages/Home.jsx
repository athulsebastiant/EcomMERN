import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";
import { backendUrl } from "../App";

import { Link } from "react-router-dom";
const Home = ({ token }) => {
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  useEffect(() => {
    fetchCounts();
    fetchAllOrders();
  }, []);

  const fetchCounts = async () => {
    try {
      const productRes = await axios.get(backendUrl + "/api/product/list");
      if (productRes.data.success) {
        setProductCount(productRes.data.products.length);
      }

      const categoryRes = await axios.get(backendUrl + "/api/category/list");
      if (categoryRes.data.success) {
        setCategoryCount(categoryRes.data.categories.length);
      }

      const userRes = await axios.get(backendUrl + "/api/user/get-users");
      if (userRes.data.success) {
        setUserCount(userRes.data.users.length);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
        setOrderCount(response.data.orders.length);
        const totalRevenue = response.data.orders.reduce(
          (sum, order) => sum + order.amount,
          0
        );
        setRevenue(totalRevenue);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item>
          <Link to="/update">
            <Card
              className="stat-card"
              style={{ width: "200px", height: "150px" }}
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h6">Products</Typography>
                <Typography variant="h4" color="primary">
                  {productCount}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/catEdit">
            <Card
              className="stat-card"
              style={{ width: "200px", height: "150px" }}
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h6">Categories</Typography>
                <Typography variant="h4" color="primary">
                  {categoryCount}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/users">
            <Card
              className="stat-card"
              style={{ width: "200px", height: "150px" }}
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h6">Users</Typography>
                <Typography variant="h4" color="primary">
                  {userCount}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
      <Typography
        variant="h4"
        align="center"
        color="secondary"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        Sales
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item>
          <Link to="/orders">
            <Card
              className="stat-card"
              style={{ width: "200px", height: "150px" }}
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h6">Orders</Typography>
                <Typography variant="h4" color="secondary">
                  {orderCount}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item>
          <Card
            className="stat-card"
            style={{ width: "250px", height: "150px" }}
          >
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography variant="h6">Revenue</Typography>
              <Typography variant="h4" color="secondary">
                ₹{revenue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
