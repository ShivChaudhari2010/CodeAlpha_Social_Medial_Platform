import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

console.log(process.env.MONGO_URI); // temporary

const PORT = process.env.PORT || 5000;

// Connect Database
await connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});