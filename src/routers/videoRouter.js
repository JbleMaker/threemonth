import express from "express";
import {
  videoView,
  getVideoEdit,
  postVideoEdit,
  getVideoUpload,
  postVideoUpload,
  videoDelete,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.route("/upload").get(getVideoUpload).post(postVideoUpload);
videoRouter.get("/:id([0-9a-f]{24})", videoView); //watch
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .get(getVideoEdit)
  .post(postVideoEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", videoDelete);

export default videoRouter;
