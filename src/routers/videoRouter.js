import express from "express";
import {
  videoView,
  getVideoEdit,
  postVideoEdit,
  getVideoUpload,
  postVideoUpload,
  videoDelete,
} from "../controllers/videoController";
import { protectorMiddleware, uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", videoView); //watch
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getVideoUpload)
  .post(
    uploadVideo.fields([{ name: "video" }, { name: "thumb" }]),
    postVideoUpload
  );
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getVideoEdit)
  .post(postVideoEdit);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(videoDelete);

export default videoRouter;
