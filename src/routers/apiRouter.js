import express from "express";
import {
  registerView,
  videoCreateComment,
  videoDeleteComment,
} from "../controllers/videoController";
import {
  marketRegisterView,
  marketCreateComment,
  marketDeleteComment,
} from "../controllers/marketController";
import {
  commuRegisterView,
  communityCreateComment,
  communityDeleteComment,
} from "../controllers/communityController";
import { noticeRegisterView } from "../controllers/noticeController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", videoCreateComment);
apiRouter.delete(
  "/videos/:videoId([0-9a-f]{24})/comments/:id([0-9a-f]{24})/delete",
  videoDeleteComment
);

//Market Comments
apiRouter.post("/markets/:id([0-9a-f]{24})/view", marketRegisterView);
apiRouter.post("/markets/:id([0-9a-f]{24})/comment", marketCreateComment);
apiRouter.delete(
  "/markets/:marketId([0-9a-f]{24})/comments/:id([0-9a-f]{24})/delete",
  marketDeleteComment
);

//Community Comments
apiRouter.post("/community/:id([0-9a-f]{24})/view", commuRegisterView);
apiRouter.post("/community/:id([0-9a-f]{24})/comment", communityCreateComment);
apiRouter.delete(
  "/community/:communityId([0-9a-f]{24})/comments/:id([0-9a-f]{24})/delete",
  communityDeleteComment
);

apiRouter.post("/notices/:id([0-9a-f]{24})/view", noticeRegisterView);

export default apiRouter;
