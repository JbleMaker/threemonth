import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  createdAt: { type: Date, required: true, default: new Date() },
});

const Communitycomment = mongoose.model("Communitycomment", commentSchema);

export default Communitycomment;
