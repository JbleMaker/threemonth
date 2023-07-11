import mongoose from "mongoose";

const marketSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  division: { type: String, required: true, trim: true },
  price: { type: String, required: true, trim: true },
  zone: { type: String, required: true, trim: true },
  contents: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Market = mongoose.model("Market", marketSchema);
export default Market;
