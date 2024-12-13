import mongoose from "mongoose";
import User from "./userModel.js";
import Product from "./productModel.js";
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Ensure one cart per user
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    totalItems: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to update total items and price
cartSchema.pre("save", function (next) {
  this.totalItems = this.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  next();
});

// Method to calculate total price (can be more complex with discounts, etc.)
cartSchema.methods.calculateTotalPrice = async function () {
  const totalPrice = await Promise.all(
    this.items.map(async (item) => {
      const product = await Product.findById(item.product);
      return product.price * item.quantity;
    })
  ).then((prices) => prices.reduce((total, price) => total + price, 0));

  this.totalPrice = totalPrice;
  return totalPrice;
};

const Cart = mongoose.model("Cart", cartSchema);

// Export the model
module.exports = Cart;
