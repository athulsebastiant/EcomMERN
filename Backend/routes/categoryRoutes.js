import express from "express";
import {
  addCategory,
  removeCategory,
  listCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import adminAuth from "../middleware/adminAuth.js";
const categoryRouter = express.Router();

categoryRouter.post(
  "/add",
  adminAuth,

  addCategory
);

categoryRouter.post("/remove", adminAuth, removeCategory);

categoryRouter.get("/list", listCategories);

categoryRouter.patch("/update", adminAuth, updateCategory);

export default categoryRouter;
