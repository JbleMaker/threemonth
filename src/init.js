import "dotenv/config";
import "./db";
import app from "./server";

//Models
import "./models/Video";
import "./models/User";
import "./models/Market";
import "./models/Notice";
import "./models/Community";

//commentModels
import "./models/Marketcomment";
import "./models/Communitycomment";
import "./models/Videocomment";

const PORT = process.env.PORT || 3000;

const listeningServer = () => {
  console.log(`✅ Listening to server: http://localhost:${PORT} 🚀`);
};

app.listen(PORT, listeningServer);
