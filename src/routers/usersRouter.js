import express from "express";
import { edit, removeId, logout, watch } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", removeId);
userRouter.get("/:id", watch);

export default userRouter;
