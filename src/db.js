import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/threemonth");
const db = mongoose.connection;

const openServer = () => console.log("✅ Connected to DB");
const errorServer = (error) => console.log("❌ DB Error", error);

db.on("error", errorServer);
db.once("open", openServer);
