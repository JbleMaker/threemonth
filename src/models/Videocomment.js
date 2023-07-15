import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
  createAt: { type: Date, required: true, default: new Date() },
});

const Videocomment = mongoose.model("Videocomment", commentSchema);

export default Videocomment;
