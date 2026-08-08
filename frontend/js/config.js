console.log("Hostname:", window.location.hostname);
console.log("Origin:", window.location.origin);

// const host = window.location.hostname;

// const API_BASE_URL =
//   host === "localhost" || host === "127.0.0.1"
//     ? "http://localhost:5000/api/v1"
//     : "https://mini-social-media-backend-ndjk.onrender.com/api/v1";

const CONFIG = {
  API_BASE_URL:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api/v1"
      : "https://mini-social-media-backend-ndjk.onrender.com/api/v1"
};

const API_BASE_URL = CONFIG.API_BASE_URL;

const TOKEN_KEY = "token";
const USER_KEY = "user";
