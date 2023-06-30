import express from "express";
import {
  marketUpload,
  marketSee,
  marketEdit,
  marketDelete,
} from "../controllers/marketController";

const marketRouter = express.Router();

marketRouter.get("/upload", marketUpload);
marketRouter.get("/:id(\\d+)", marketSee);
marketRouter.get("/:id(\\d+)/edit", marketEdit);
marketRouter.get("/:id(\\d+)/delete", marketDelete);

export default marketRouter;
