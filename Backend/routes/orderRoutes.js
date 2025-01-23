import express from "express";
import {
  placeOrder,
  placeOrderRazorPay,
  allOrders,
  userOrders,
  updateStatus,
  verifyRazorpay,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
const orderRouter = express.Router();

//Admin Features
orderRouter.post("/list", adminAuth, allOrders);

orderRouter.post("/status", adminAuth, updateStatus);

// payment features

orderRouter.post("/place-order", authUser, placeOrder);

orderRouter.post("/rpay", authUser, placeOrderRazorPay);

// user features

orderRouter.post("/user-orders", authUser, userOrders);

orderRouter.post("/verify", authUser, verifyRazorpay);

export default orderRouter;
