import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cartController.js";
const router = express.Router();

router.get("/get", getUserCart);
router.post("/add", addToCart);
router.put("/update", updateCart);

export default router;
