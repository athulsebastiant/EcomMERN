import authUser from "../middleware/auth.js";
import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  editUser,
  getUserDetails,
  listUsers,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/admin", adminLogin);

userRouter.patch("/edit-user", authUser, editUser);

userRouter.post("/get-user", authUser, getUserDetails);

userRouter.get("/get-users", listUsers);
export default userRouter;
