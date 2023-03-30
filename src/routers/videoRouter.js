import express from "express";
import {
  upload,
  watch,
  getEdit,
  deleteVideo,
  postEdit,
  getUpload,
  postUpload,
} from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middlewares";
const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(deleteVideo);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(videoUpload.fields([{ name: "video" }, { name: "thumb" }]), postUpload); // multer에서 2개 이상의 파일을 받아야 할 때 single 말고 array나 fields를 사용하면 된다!

export default videoRouter;
