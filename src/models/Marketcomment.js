import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  market: { type: mongoose.Schema.Types.ObjectId, ref: "Market" },
  createdAt: { type: Date, required: true, default: new Date() },
});

const Marketcomment = mongoose.model("Marketcomment", commentSchema);

export default Marketcomment;
