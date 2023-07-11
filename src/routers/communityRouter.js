import express from "express";
import {
  getCommuUpload,
  postCommuUpload,
  commuRead,
  getCommuEdit,
  postCommuEdit,
  commuDelete,
} from "../controllers/communityController";

const communityRouter = express.Router();

communityRouter.route("/upload").get(getCommuUpload).post(postCommuUpload);
communityRouter.get("/:id([0-9a-f]{24})", commuRead);
communityRouter
  .route("/:id([0-9a-f]{24})/edit")
  .get(getCommuEdit)
  .post(postCommuEdit);
communityRouter.get("/:id([0-9a-f]{24})/delete", commuDelete);

export default communityRouter;
