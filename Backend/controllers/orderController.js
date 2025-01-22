import orderModel from "../models/orderModel.js";
import User from "../models/userModel.js";

// placing orders using cod
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      paymentProperty: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartItems: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrderRazorPay = async (req, res) => {};

// All orders data for admin panel
const allOrders = async (req, res) => {};

// User orders data for frontend
const userOrders = async (req, res) => {};

// update order status from Admin Panel
const updateStatus = async (req, res) => {};

export { placeOrder, placeOrderRazorPay, allOrders, userOrders, updateStatus };
