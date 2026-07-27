
// Backend API URL
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/v1"
    : "https://codealpha-social-medial-platform.onrender.com/api/v1";

// Local Storage Keys
const TOKEN_KEY = "token";
const USER_KEY = "user";

// App Config
const CONFIG = {
  API_BASE_URL,
  TOKEN_KEY,
  USER_KEY,
};