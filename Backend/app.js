import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
//pu7I35FUvFiWvXpy
//App config

const app = express();
const port = process.env.port || 4000;
connectDB();
connectCloudinary();
// middlewares

app.use(express.json());
app.use(cors());

//api endpoints

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log("Server started on PORT : " + port);
});
