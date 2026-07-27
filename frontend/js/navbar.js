document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menuToggle");

  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }


  // Populate header username + wire up Logout (shared across feed.html/profile.html)
  const usernameEl = document.getElementById("username");
  const logoutBtn = document.getElementById("logoutBtn");

  if (usernameEl) {
    const user = Auth.getUser();
    if (user) {
      usernameEl.textContent = user.username;
    }
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      Auth.logout();
    });
  }
});