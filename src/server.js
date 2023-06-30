import express from "express";
import morgan from "morgan";

//Router
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/usersRouter";
import noticeRouter from "./routers/noticeRouter";
import communityRouter from "./routers/communityRouter";
import marketRouter from "./routers/marketRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");
const PORT = 4000;

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/notice", noticeRouter);
app.use("/community", communityRouter);
app.use("/market", marketRouter);

const listeningServer = () => {
  console.log(`✅ listening to server: http://localhost:${PORT} 🚀`);
};

app.listen(PORT, listeningServer);
