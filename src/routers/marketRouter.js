import express from "express";
import {
  getMarketUpload,
  postMarketUpload,
  marketRead,
  getMarketEdit,
  postMarketEdit,
  marketDelete,
} from "../controllers/marketController";

const marketRouter = express.Router();

marketRouter.route("/upload").get(getMarketUpload).post(postMarketUpload);
marketRouter.get("/:id([0-9a-f]{24})", marketRead);
marketRouter
  .route("/:id([0-9a-f]{24})/edit")
  .get(getMarketEdit)
  .post(postMarketEdit);
marketRouter.get("/:id([0-9a-f]{24})/delete", marketDelete);

export default marketRouter;
