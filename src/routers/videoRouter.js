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
videoRouter.get("/:id(\\d+)", videoView);
videoRouter.route("/:id(\\d+)/edit").get(getVideoEdit).post(postVideoEdit);
videoRouter.get("/:id(\\d+)/delete", videoDelete);

export default videoRouter;
