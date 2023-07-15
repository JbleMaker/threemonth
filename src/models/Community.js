import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  division: { type: String, required: true, trim: true },
  contents: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Communitycomment" }],
});

const Community = mongoose.model("Community", communitySchema);
export default Community;
