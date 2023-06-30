import express from "express";
import { viewHome, search } from "../controllers/userController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";
import { noticeView } from "../controllers/noticeController";
import { marketView } from "../controllers/marketController";
import { communityView } from "../controllers/communityController";

const rootRouter = express.Router();

rootRouter.get("/", viewHome);
rootRouter.get("/marketView", marketView);
rootRouter.get("/noticeView", noticeView);
rootRouter.get("/communityView", communityView);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
