const Toast = {
  show(message, type = "info") {
    let container = document.querySelector(".toast-container");

    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "fadeOut .3s forwards";
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  },

  success(message) {
    this.show(message, "success");
  },

  error(message) {
    this.show(message, "error");
  },

  warning(message) {
    this.show(message, "warning");
  },

  info(message) {
    this.show(message, "info");
  }
};