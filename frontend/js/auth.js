const Auth = {
  
  // ============================
  // Register
  // ============================
  async register(userData) {
    const response = await API.post("/auth/register",userData);

    this.saveSession(response);
    return response;
  },

  // ============================
  // Login
  // ============================

  async login(credentials) {
    const response = await API.post("/auth/login",credentials);

    this.saveSession(response);
    return response;
  },

  // ============================
  // Logout
  // ============================

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = "index.html";
  },

  // ============================
  // Current User
  // ============================

  async fetchCurrentUser() {
    const response = await API.get("/auth/me");
    this.saveUser(response.user);
    return response.user;
  },

  // ============================
  // Save Session
  // ============================

  saveSession(response) {
    this.saveToken(response.token);
    this.saveUser(response.user);
  },

  // ============================
  // Token
  // ============================

  saveToken(token) {
    localStorage.setItem(TOKEN_KEY,token);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  isLoggedIn() {
    return !!this.getToken();
  },

  // ============================
  // User
  // ============================

  saveUser(user) {
    localStorage.setItem(USER_KEY,JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  initRegisterForm() {
    const form = document.getElementById("registerForm");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword =
        document.getElementById("confirmPassword").value;
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      const button = form.querySelector("button[type='submit']");

      try {
        Loading.button(button, "Creating Account...");
        await this.register({username, email, password,});

        Toast.success("Account created successfully");
        window.location.href = "feed.html";

      } catch (error) {
        Toast.error(error.message || "Something went wrong.");
      } finally {
        Loading.restore(button);
      }
    });
  },

  initLoginForm() {


    console.log("Login form initialized");


    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();


      console.log("Login button clicked");




      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const button = form.querySelector("button[type='submit']");

      try {
        Loading.button(button, "Signing In...");
        await this.login({email, password,});
        Toast.success("Login successful");
        window.location.href = "feed.html";

      } catch (error) {
        Toast.error(error.message || "Something went wrong.");
      } finally {
        Loading.restore(button);
      }});
  },
};

document.addEventListener("DOMContentLoaded", () => {
  Auth.initLoginForm();
  Auth.initRegisterForm();
});