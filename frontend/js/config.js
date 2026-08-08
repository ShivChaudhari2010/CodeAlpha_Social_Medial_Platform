console.log("Hostname:", window.location.hostname);
console.log("Origin:", window.location.origin);

const host = window.location.hostname;

const API_BASE_URL = "http://localhost:5000/api/v1";

// const API_BASE_URL =
//   host === "localhost" || host === "127.0.0.1"
//     ? "http://localhost:5000/api/v1"
//     : "https://your-real-backend.onrender.com/api/v1";

const TOKEN_KEY = "token";
const USER_KEY = "user";




// Backend API URL

// const API_BASE_URL =
//   window.location.hostname === "localhost"
//     ? "http://localhost:5000/api/v1"
//     : "https://YOUR-BACKEND.onrender.com/api/v1";

// // Local Storage Keys
// const TOKEN_KEY = "token";
// const USER_KEY = "user";

// // App Config
// const CONFIG = {
//   API_BASE_URL,
//   TOKEN_KEY,
//   USER_KEY,
// };