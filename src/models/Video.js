import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: { type: String, requred: true },
  thumbUrl: { type: String, requred: true },
  description: { type: String, required: true, trim: true, minLength: 2 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.static("formathashtags", function (hashtags) {
  // static을 사용하면 import 없이도 Model.function()형태로 사용이 가능
  // 즉 static은 스키마에서 컴파일된 모델에 정적 "class" 메서드를 추가한다.
  return hashtags
    .split(",")
    .map((word) =>
      word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`
    );
});

videoSchema.static("changePathFormula", (urlPath) => {
  return urlPath.replace(/\\/g, "/");
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
