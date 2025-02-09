import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Navbar from "./components/Navbar";
import AllProducts from "./pages/AllProducts";
import ProductItem from "./components/ProductItem";
import Searchbar from "./components/Searchbar";
import Orders from "./pages/Orders";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  return (
    <div className="MainDivApp">
      <ToastContainer />
      <Navbar />
      <Searchbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route
          path="/place-order"
          element={<ProtectedRoute element={<PlaceOrder />} />}
        />
        <Route path="/all-products" element={<AllProducts />} />
        <Route
          path="/orders"
          element={<ProtectedRoute element={<Orders />} />}
        />
        <Route
          path="/user-profile"
          element={<ProtectedRoute element={<UserProfile />} />}
        />
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
