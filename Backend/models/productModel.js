import mongoose, { mongo } from "mongoose";
import Category from "./categoryModel.js";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  stock: { type: Number, required: true },
});

const Product =
  mongoose.models.product || mongoose.model("Product", productSchema);

export default Product;
