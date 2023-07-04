import express from "express";
import {
  getMarketUpload,
  postMarketUpload,
  marketRead,
  marketEdit,
  marketDelete,
} from "../controllers/marketController";

const marketRouter = express.Router();

marketRouter.route("/upload").get(getMarketUpload).post(postMarketUpload);
marketRouter.get("/:id([0-9a-f]{24})", marketRead);
marketRouter.get("/:id([0-9a-f]{24})/edit", marketEdit);
marketRouter.get("/:id([0-9a-f]{24})/delete", marketDelete);

export default marketRouter;
