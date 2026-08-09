(function () {
  const THEME_KEY = "theme"; // "dark" | "light"

  function applyTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");

    const btn = document.getElementById("themeToggle");

    if (btn) {
      btn.innerHTML =
        theme === "dark"
          ? '<i class="bi bi-sun-fill"></i>'
          : '<i class="bi bi-moon-fill"></i>';
    }
  }

  function getSavedTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    // No preference saved yet — fall back to the OS/browser setting
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(getSavedTheme());

    const btn = document.getElementById("themeToggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const isDark = document.body.classList.contains("dark-mode");
        const next = isDark ? "light" : "dark";
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    }
  });
})();