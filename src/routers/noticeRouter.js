import express from "express";
import {
  getNoticeUpload,
  postNoticeUpload,
  noticeRead,
  noticeEdit,
  noticeDelete,
} from "../controllers/noticeController";

const noticeRouter = express.Router();

noticeRouter.route("/upload").get(getNoticeUpload).post(postNoticeUpload);
noticeRouter.get("/:id([0-9a-f]{24})", noticeRead);
noticeRouter.get("/:id([0-9a-f]{24})/edit", noticeEdit);
noticeRouter.get("/:id([0-9a-f]{24})/delete", noticeDelete);

export default noticeRouter;
