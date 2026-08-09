const RouteGuard = {

  // Protect pages that require login
  async requireAuth() {
    if (!Auth.isLoggedIn()) {
      window.location.href = "login.html";
      return;
    }
    // Token exists locally, but confirm it's still valid on the server.
    try {
      await Auth.fetchCurrentUser();
    } catch (error) {
      // Expired/invalid token -> clear it and send to login
      Auth.logout();
    }
  },


  // Prevent logged-in users from visiting Login/Register
  async requireGuest() {
    if (!Auth.isLoggedIn()) return; // no token at all, nothing to check

    try {
      await Auth.fetchCurrentUser(); // confirms token is still valid
      window.location.href = "index.html";
    } catch (error) {
      // Stale/expired/garbage token was blocking access to Login/Register.
      // Clear it instead of bouncing the user back to the landing page.
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }
};