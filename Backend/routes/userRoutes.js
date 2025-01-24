import authUser from "../middleware/auth.js";
import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  editUser,
  getUserDetails,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/admin", adminLogin);

userRouter.patch("/edit-user", authUser, editUser);

userRouter.get("/get-user", authUser, getUserDetails);
export default userRouter;
