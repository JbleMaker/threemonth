import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  contents: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  meta: {
    views: { type: Number, default: 0, required: true },
  },
});

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
