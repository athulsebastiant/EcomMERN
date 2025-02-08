import express from "express";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import Product from "../models/productModel.js";
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Check product stock first
      const product = await Product.findById(itemId).session(session);
      if (!product) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: "Product not found",
        });
      }

      // Get current cart data
      const userData = await User.findById(userId).session(session);
      let cartData = userData.cartItems || {};
      const currentQuantity = cartData[itemId] || 0;

      // Ensure that adding one more does not exceed available stock
      if (product.stock <= 0 || currentQuantity >= product.stock) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: "Sorry, no more stock available!",
        });
      }

      // **Only update the cart if the stock check passes**
      cartData[itemId] = currentQuantity + 1;

      // Decrease product stock
      await Product.findByIdAndUpdate(
        itemId,
        { $inc: { stock: -1 } },
        { session, new: true }
      );

      // Update cart
      await User.findByIdAndUpdate(
        userId,
        { cartItems: cartData },
        { session }
      );

      // Commit the transaction
      await session.commitTransaction();
      res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Error adding to cart",
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity cannot be negative",
      });
    }

    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Get current cart data and product data
      const userData = await User.findById(userId).session(session);
      const product = await Product.findById(itemId).session(session);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const currentQuantity = userData.cartItems?.[itemId] || 0;
      const quantityDifference = quantity - currentQuantity;

      // Check if the requested quantity exceeds available stock
      if (quantityDifference > 0 && quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: "Requested quantity exceeds available stock!",
        });
      }

      // Update product stock
      const updatedProduct = await Product.findByIdAndUpdate(
        itemId,
        { $inc: { stock: -quantityDifference } },
        { session, new: true }
      );

      // Double-check the stock after update
      if (updatedProduct.stock < 0) {
        throw new Error("Stock cannot be negative");
      }

      // Update cart
      let cartData = userData.cartItems || {};
      if (quantity === 0) {
        delete cartData[itemId];
      } else {
        cartData[itemId] = quantity;
      }

      await User.findByIdAndUpdate(
        userId,
        { cartItems: cartData },
        { session }
      );

      // Commit the transaction
      await session.commitTransaction();
      res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
      // If anything fails, abort transaction
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error updating cart",
    });
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
