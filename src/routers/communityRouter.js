import express from "express";
import {
  commuUpload,
  see,
  commuEdit,
  commuDelete,
} from "../controllers/communityController";

const communityRouter = express.Router();

communityRouter.get("/upload", commuUpload);
communityRouter.get("/:id(\\d+)", see);
communityRouter.get("/:id(\\d+)/edit", commuEdit);
communityRouter.get("/:id(\\d+)/delete", commuDelete);

export default communityRouter;
