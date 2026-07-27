
document.addEventListener("DOMContentLoaded", () => {
  const createBtn = document.getElementById("createPostBtn");
  if (createBtn) {
    createBtn.addEventListener("click", createPost);
  }

  const container = document.getElementById("postsContainer");
  container.addEventListener("click", handlePostActions);

  loadPosts();
});

// ================================
// Load Posts (works for guests too — GET /posts is public)
// ================================

async function loadPosts() {
  try {
    const posts = await PostService.getPosts();
    renderPosts(posts);
  } catch (error) {
    console.error(error);
  }
}

// ================================
// Create Post (members only — box is hidden for guests)
// ================================

async function createPost() {
  const textarea = document.getElementById("postContent");
  const content = textarea.value.trim();
  const button = document.getElementById("createPostBtn");

  if (!content) {
    Toast.error("Please write something.");
    return;
  }

  try {
    Loading.button(button, "Posting...");
    await PostService.createPost(content);
    textarea.value = "";
    await loadPosts();
  } catch (error) {
    Toast.error(error.message || "Something went wrong.");
  } finally {
    Loading.restore(button);
  }
}

// ================================
// Delete Post (owner only — button only renders for isOwner)
// ================================

async function deletePost(postId) {
  if (!confirm("Delete this post?")) return;
  try {
    await PostService.deletePost(postId);
    await loadPosts();
  } catch (error) {
    Toast.error(error.message || "Something went wrong.");
  }
}

// ================================
// Like / Unlike (members only)
// ================================

async function toggleLike(postId, button) {
  if (!Auth.isLoggedIn()) {
    window.location.href = "login.html";
    return;
  }
  try {
    button.disabled = true;
    const response = await PostService.toggleLike(postId);
    const likesElement = document.getElementById(`likes-${postId}`);
    if (likesElement) {
      likesElement.textContent = `❤️ ${response.likesCount} Likes`;
    }
    button.textContent = response.likedByMe ? "❤️ Unlike" : "🤍 Like";
  } catch (error) {
    Toast.error(error.message || "Something went wrong.");
  } finally {
    button.disabled = false;
  }
}

// ================================
// Render Posts
// ================================

function renderPosts(posts) {
  const container = document.getElementById("postsContainer");
  container.innerHTML = "";

  if (!posts || posts.length === 0) {
    container.innerHTML = `<div class="empty-state">
            <div class="empty-icon">📝</div>
            <h2>No Posts Yet</h2>
            <p>Be the first person to share something.</p>
        </div>`;
    return;
  }

  const loggedIn = Auth.isLoggedIn();

  posts.forEach((post) => {
    container.innerHTML += `<div class="post-card" data-id="${post._id}">
    <div class="post-header">
        <div>
            <h3>${escapeHtml(post.author.username)}</h3>
            <small>${formatDate(post.createdAt)}</small>
        </div>
    </div>

    <div class="post-content">
        ${escapeHtml(post.content)}
    </div>

    <div class="post-footer">
        <span class="likes-count" id="likes-${post._id}">
            ❤️ ${post.likesCount || 0} Likes
        </span>

        <div class="post-actions">
            ${loggedIn ? `<button class="like-btn" data-id="${post._id}">
                ${post.likedByMe ? "❤️ Unlike" : "🤍 Like"}
            </button>` : `<a href="login.html" class="like-btn">🤍 Like</a>`}
            ${post.isOwner ? `<button class="delete-btn" data-id="${post._id}"> Delete </button>` : ""}
        </div>
    </div>
</div>`;
  });
}

function formatDate(date) {
  return new Date(date).toLocaleString();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

async function handlePostActions(event) {
  const button = event.target;

  if (button.classList.contains("like-btn")) {
    const postId = button.dataset.id;
    if (postId) await toggleLike(postId, button); // guest link has no data-id, just navigates to login
    return;
  }

  if (button.classList.contains("delete-btn")) {
    const postId = button.dataset.id;
    deletePost(postId);
  }
}