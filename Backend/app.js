import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import cartRoute from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
//pu7I35FUvFiWvXpy
//App config

const app = express();
const port = process.env.port || 4000;
connectDB();
connectCloudinary();
// middlewares

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRouter);
//api endpoints

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log("Server started on PORT : " + port);
});
