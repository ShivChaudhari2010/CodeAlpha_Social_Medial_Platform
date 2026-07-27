function formatDate(date) {
  return new Date(date).toLocaleString();
}

function escapeHTML(text) {

  return text.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}