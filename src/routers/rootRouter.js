import express from "express";
import { viewHome, videoSearch } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";
import { noticeView } from "../controllers/noticeController";
import { marketView } from "../controllers/marketController";
import { communityView } from "../controllers/communityController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", viewHome);
rootRouter.get("/marketView", marketView);
rootRouter.get("/noticeView", noticeView);
rootRouter.get("/communityView", communityView);
rootRouter.get("/search", videoSearch);

rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);

export default rootRouter;
