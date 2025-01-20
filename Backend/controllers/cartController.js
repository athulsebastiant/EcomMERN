import express from "express";
import User from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    console.log(userId, itemId);
    const userData = await User.findById(userId);
    let cartData = userData.cartItems || {};
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    console.log(cartData);
    await User.findByIdAndUpdate(userId, { cartItems: cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;
    const userData = await User.findById(userId);
    let cartData = userData.cartItems || {};
    cartData[itemId] = quantity;
    await User.findByIdAndUpdate(userId, { cartItems: cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await User.findById(userId);
    let cartData = userData.cartItems || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
