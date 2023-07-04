import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  contents: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
