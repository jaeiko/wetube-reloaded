import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true, unique: true },
  location: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  // pre, post 메소드 : 스키마에 붙여 사용하는데, 각각 특정 동작 이전, 이후에 어떤 행동을 취할 지를 정의할 수 있다.(Hook를 건다고 생각하면 된다.)
  // 여기서는 save 하기 전에 호출된다. next를 실행하지 않으면 save가 되지 않기 때문에 다큐먼트 저장 전 최종 검증으로 쓸 수 있다.
  if (this.isModified("password")) {
    // bcrypt를 통해 해싱(DB에 비밀번호를 저장할때 랜덤한 값으로 저장)
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
