import express from "express";
import {
  noticeUpload,
  noticeSee,
  noticeEdit,
  noticeDelete,
} from "../controllers/noticeController";

const noticeRouter = express.Router();

noticeRouter.get("/upload", noticeUpload);
noticeRouter.get("/:id(\\d+)", noticeSee);
noticeRouter.get("/:id(\\d+)/edit", noticeEdit);
noticeRouter.get("/:id(\\d+)/delete", noticeDelete);

export default noticeRouter;
