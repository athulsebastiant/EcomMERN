import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";
import { updateStatus } from "../controllers/orderController.js";
const router = express.Router();

router.post("/get", authUser, getUserCart);
router.post("/add", authUser, addToCart);
router.put("/update", authUser, updateCart);
router.post("/status", adminAuth, updateStatus);
export default router;
