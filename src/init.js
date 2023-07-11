import "dotenv/config";
import "./db";
import app from "./server";

//Models
import "./models/Video";
import "./models/User";
import "./models/Market";
import "./models/Notice";
import "./models/Community";

const PORT = 4000;

const listeningServer = () => {
  console.log(`✅ Listening to server: http://localhost:${PORT} 🚀`);
};

app.listen(PORT, listeningServer);
