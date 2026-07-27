const Loading = {
  show() {
    let overlay = document.getElementById("loadingOverlay");

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "loadingOverlay";
      overlay.className = "loading-overlay";
      overlay.innerHTML = `<div class="loader"></div>`;
      document.body.appendChild(overlay);
    }

    overlay.classList.add("show");
  },

  hide() {
    const overlay = document.getElementById("loadingOverlay");

    if (overlay) {
      overlay.classList.remove("show");
    }
  },

  button(button, text = "Loading...") {
    if (!button) return;
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = text;
    button.disabled = true;
    button.classList.add("btn-loading");
  },

  restore(button) {
    if (!button) return;
    button.innerHTML = button.dataset.originalText;
    button.disabled = false;
    button.classList.remove("btn-loading");
  }

};
