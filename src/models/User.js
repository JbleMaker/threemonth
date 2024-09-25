import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  avatarUrl: { type: String, default: "" },
  socialOnly: { type: Boolean, default: false },
  identifier: { type: String, required: true, trim: true, unique: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: { type: String },
  /////////////////---Comments---//////////////////////////////////////
  makretComments: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Marketcomment" },
  ],
  communityComments: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Communitycomment" },
  ],
  ///////////////////---Models---//////////////////////////////////////
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  communities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
  markets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Market" }],
  notices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notice" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 6);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
