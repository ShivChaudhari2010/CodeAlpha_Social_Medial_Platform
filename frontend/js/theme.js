const Theme = {
  init() {
    const saved = localStorage.getItem("theme");
    const theme = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
    this.updateButton();
  },
  toggle() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    this.updateButton();
  },
  updateButton() {
    const button = document.getElementById("themeToggle");
    if (!button) return;
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    button.textContent = dark ? "☀️" : "🌙";
    button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    button.title = dark ? "Light mode" : "Dark mode";
  }
};
document.addEventListener("DOMContentLoaded", () => {
  Theme.init();
  const button = document.getElementById("themeToggle");
  if (button) button.addEventListener("click", () => Theme.toggle());
});
