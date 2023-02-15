import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express(); // 변수명 상관없음, express application 생성(express 규칙)
const logger = morgan("dev");
app.use(logger);

const handleHome = (req, res) => res.send("Home");
const handleEditUser = (req, res) => res.send("Edit User");
const handleWatchVideo = (req, res) => res.send("Watch Video");

const globalRouter = express.Router();
globalRouter.get("/", handleHome);
const userRouter = express.Router();
userRouter.get("/edit", handleEditUser);
const videoRouter = express.Router();
videoRouter.get("/watch", handleWatchVideo);

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

const handleListening = () => console.log(`Server listening on port ${4000}`);

app.listen(PORT, handleListening);
