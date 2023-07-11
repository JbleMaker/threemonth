import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

const openServer = () => console.log("✅ Connected to DB");
const errorServer = (error) => console.log("❌ DB Error", error);

db.on("error", errorServer);
db.once("open", openServer);
