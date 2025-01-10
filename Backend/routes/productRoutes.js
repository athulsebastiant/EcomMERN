import express from "express";
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  updateProduct,
  getProductsByCategory,
  getUniqueBrands,
} from "../controllers/productController.js";

import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.delete("/remove", adminAuth, removeProduct);
productRouter.patch("/update/:id", adminAuth, updateProduct);

productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);
productRouter.get("/list-with-category", getProductsByCategory);
productRouter.get("/get-brands", getUniqueBrands);
export default productRouter;
