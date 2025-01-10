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
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  return (
    <div className="MainDivApp">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/all-products" element={<AllProducts />} />
        {/* <Route path="/product-item" element={<ProductItem />} /> */}
      </Routes>
    </div>
  );
};

export default App;
