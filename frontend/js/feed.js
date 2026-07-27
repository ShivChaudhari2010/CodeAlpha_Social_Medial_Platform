// document.addEventListener("DOMContentLoaded", () => {
//   RouteGuard.requireAuth();
//   const user = Auth.getUser();

//   if (user) {
//     document.getElementById("username").textContent = user.username;
//   }

//   document.getElementById("logoutBtn").addEventListener("click", () => {
//     Auth.logout();
//   });

//   document.getElementById("createPostBtn").addEventListener("click", createPost);

//   const container = document.getElementById("postsContainer");

//   container.addEventListener("click", handlePostActions
//   );
//   loadPosts();
// });

// // ================================
// // Load Posts
// // ================================

// async function loadPosts() {

//   try {
//     const posts = await PostService.getPosts();
//     renderPosts(posts);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // ================================
// // Create Post
// // ================================

// async function createPost() {
//   const textarea = document.getElementById("postContent");
//   const content = textarea.value.trim();

//   if (!content) {
//     alert("Please write something.");
//     return;
//   }

//   try {
//     await PostService.createPost(content);
//     textarea.value = "";
//     loadPosts();
//   } catch (error) {
//     Toast.error(error.message || "Something went wrong.");
//   }
// }


// // ================================
// // Delete Post
// // ================================

// async function deletePost(postId) {
//   if (!confirm("Delete this post?")) return;
//   try {
//     await PostService.deletePost(postId);
//     loadPosts();
//   } catch (error) {
//     Toast.error(error.message || "Something went wrong.");
//   }
// }


// // ================================
// // Render Posts
// // ================================

// function renderPosts(posts) {
//   const container = document.getElementById("postsContainer");
//   container.innerHTML = "";
//   const currentUser = Auth.getUser();

//   if (!posts || posts.length === 0) {

//     postsContainer.innerHTML = `<div class="empty-state">
//             <div class="empty-icon">📝</div>
//             <h2>No Posts Yet</h2>
//             <p>Be the first person to share something.</p>
//         </div>`;
//     return;
//   }


//   posts.forEach((post) => {

//     const canDelete = currentUser && currentUser.id === post.author._id;

//     container.innerHTML += `
//     <div class="post-card" data-id="${post._id}">
//     <div class="post-header">
//         <div>
//             <h3>${escapeHtml(post.author.username)}</h3>
//             <small>${formatDate(post.createdAt)}</small>
//         </div>
//     </div>
//     <div class="post-content"> ${escapeHtml(post.content)} </div>
//     <div class="post-footer">
//         <span class="likes-count" id="likes-${post._id}">
//             ❤️ ${post.likesCount || 0} Likes
//         </span>
//         <div class="post-actions">
//             <button class="like-btn" data-id="${post._id}">
//                 ${post.likedByMe ? "❤️ Unlike" : "🤍 Like"}
//             </button>
//             ${post.author._id === Auth.getUser().id ? `<button class="delete-btn" data-id="${post._id}"> Delete </button>` : ""}
//         </div>
//     </div>
// </div>`;
//   });

//   container.innerHTML += `
//   <div class="post-card" data-id="${post._id}">
//     <div class="post-header">
//         <div>
//             <h3>${escapeHtml(post.author.username)}</h3>

//             <small>${formatDate(post.createdAt)}</small>
//         </div>
//     </div>

//     <div class="post-content">
//         ${escapeHtml(post.content)}
//     </div>

//       <div class="post-footer">
//           <span class="likes-count" data-id="${post._id}">
//               ❤️ ${post.likesCount || 0} Likes
//           </span>
//           <span class="comments-count" data-id="${post._id}"> 
//               💬 ${post.commentsCount || 0} Comments
//           </span>

//           <div class="post-actions">
//               <button class="like-btn" data-id="${post._id}">
//                   ${post.likedByMe ? "❤️ Unlike" : "🤍 Like"}
//               </button>

//               <button class="toggle-comments-btn" data-id="${post._id}"> 💬 View Comments
//               </button>
//               ${post.author._id === Auth.getUser()._id ? `<button class="delete-btn" data-id="${post._id}"> Delete
//                   </button> `: ""}
//           </div>
//       </div>

//       <div class="comment-section hidden" id="comments-${post._id}">
//           <div class="comment-input">
//               <input type="text" class="comment-text" data-id="${post._id}" placeholder="Write a comment...">
//               <button class="comment-btn" data-id="${post._id}"> Add </button>
//           </div>

//           <div class="comments-list"data-id="${post._id}"></div>
//       </div>
//   </div>`;
// }

// // ================================
// // Format Date
// // ================================
// function formatDate(date) {
//   return new Date(date).toLocaleString();
// }

// // ================================
// // Prevent HTML Injection
// // ================================

// function escapeHtml(text) {
//   const div = document.createElement("div");
//   div.innerText = text;
//   return div.innerHTML;
// }

// async function handlePostActions(event) {
//   const button = event.target;

//   if (button.classList.contains("like-btn")) {
//     const postId = button.dataset.id;
//     await toggleLike(postId, button);
//     return;
//   }

//   if (button.classList.contains("delete-btn")) {
//     const postId = button.dataset.id;
//     // Your existing delete logic
//     deletePost(postId);
//   }

//   if (button.classList.contains("toggle-comments-btn")) {
//     const postId = button.dataset.id;
//     toggleComments(postId);
//     return;
//   }

//   // Add Comment
//   if (button.classList.contains("comment-btn")) {
//     await submitComment(button.dataset.id);
//     return;
//   }

//   // Delete Comment
//   if (button.classList.contains("delete-comment-btn")) {
//     await removeComment(button.dataset.id);
//     return;
//   }
// }

// async function toggleLike(postId, button) {
//   try {
//     button.disabled = true;
//     const response = await PostService.toggleLike(postId);
//     updateLikeUI(postId, response.likesCount, response.likedByMe);
//   }
//   catch (error) {
//     console.error(error);
//     Toast.error(error.message || "Something went wrong.");
//   }
//   finally {
//     button.disabled = false;
//   }
// }

// async function updateLikeUI(postId, likesCount, likedByMe) {

//   const likesElement = document.getElementById(`likes-${postId}`);

//   if (likesElement) {
//     likesElement.textContent = `❤️ ${likesCount} Likes`;
//   }

//   const button = document.querySelector(`.like-btn[data-id="${postId}"]`);

//   if (button) {
//     button.textContent = likedByMe ? "❤️ Unlike" : "🤍 Like";
//   }
// }

// async function toggleComments(postId) {

//   const section = document.getElementById(`comments-${postId}`);
//   section.classList.toggle("hidden");

//   if (!section.classList.contains("hidden")) {
//     await loadComments(postId);
//   }
// }

// async function loadComments(postId) {
//   try {
//     const comments = await CommentService.getComments(postId);
//     renderComments(postId, comments);
//   }

//   catch (error) {
//     console.error(error);
//     Toast.error(error.message || "Something went wrong.");
//   }
// }

// function renderComments(postId, comments) {
//   const container = document.querySelector(`.comments-list[data-id="${postId}"]`);

//   container.innerHTML = "";
//   if (!comments || comments.length === 0) {
//     document.getElementById(`comments-list-${postId}`).innerHTML = `<div class="empty-state small">
//             <p>No comments yet.</p>
//         </div>`;
//     return;
//   }
//   comments.forEach(comment => {
//     container.innerHTML += `<div class="comment-card">
//             <h4>${escapeHtml(comment.author.username)}</h4>
//             <p>${escapeHtml(comment.content)}</p>
//             <small>${formatDate(comment.createdAt)}</small>
//             ${comment.author._id === Auth.getUser()._id ?
//         `<button class="delete-comment-btn" data-id="${comment._id}"> Delete </button>` : ""
//       }
//         </div>`;
//   });
// }

// async function submitComment(postId) {
//   const input = document.querySelector(`.comment-text[data-id="${postId}"]`);
//   const content = input.value.trim();

//   if (!content) {
//     alert("Please enter a comment.");
//     return;
//   }
//   try {
//     await CommentService.addComment(postId, content);
//     input.value = "";
//     await loadComments(postId);
//     updateCommentCount(postId, 1);
//   } catch (error) {
//     console.error(error);
//     Toast.error(error.message || "Something went wrong.");
//   }
// }

// async function removeComment(commentId) {

//   try {
//     await CommentService.deleteComment(commentId);
//     const card = document.querySelector(`.delete-comment-btn[data-id="${commentId}"]`)?.closest(".comment-card");

//     if (card) {
//       const commentsList = card.closest(".comments-list");
//       const postId = commentsList.dataset.id;
//       card.remove();
//       updateCommentCount(postId, -1);
//     }
//   } catch (error) {
//     console.error(error);
//     Toast.error(error.message || "Something went wrong.");
//   }
// }

// function updateCommentCount(postId, change) {
//   const counter = document.querySelector(`.comments-count[data-id="${postId}"]`);
//   if (!counter) return;

//   const current = parseInt(counter.textContent.match(/\d+/)?.[0] || 0, 10);

//   counter.textContent = `💬 ${current + change} Comments`;
// }

// async function createPost() {
//   const button = document.getElementById("createPostBtn");

//   try {
//     Loading.button(button, "Posting...");
//     await PostService.createPost(content);
//   } finally {
//     Loading.restore(button);
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  RouteGuard.requireAuth();
  const user = Auth.getUser();

  if (user) {
    document.getElementById("username").textContent = user.username;
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    Auth.logout();
  });

  document.getElementById("createPostBtn").addEventListener("click", createPost);

  const container = document.getElementById("postsContainer");

  container.addEventListener("click", handlePostActions
  );
  loadPosts();
});

// ================================
// Load Posts
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
// Create Post
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
// Delete Post
// ================================

async function deletePost(postId) {
  if (!confirm("Delete this post?")) return;
  try {
    await PostService.deletePost(postId);
    loadPosts();
  } catch (error) {
    Toast.error(error.message || "Something went wrong.");
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
        <span class="comments-count" data-id="${post._id}">
            💬 ${post.commentsCount || 0} Comments
        </span>

        <div class="post-actions">
            <button class="like-btn" data-id="${post._id}">
                ${post.likedByMe ? "❤️ Unlike" : "🤍 Like"}
            </button>

            <button class="toggle-comments-btn" data-id="${post._id}"> 💬 View Comments
            </button>
            ${post.isOwner ? `<button class="delete-btn" data-id="${post._id}"> Delete </button>` : ""}
        </div>
    </div>

    <div class="comment-section hidden" id="comments-${post._id}">
        <div class="comment-input">
            <input type="text" class="comment-text" data-id="${post._id}" placeholder="Write a comment...">
            <button class="comment-btn" data-id="${post._id}"> Add </button>
        </div>
        <div class="comments-list" data-id="${post._id}"></div>
    </div>
</div>`;
  });
}

// ================================
// Format Date
// ================================
function formatDate(date) {
  return new Date(date)
    .toLocaleString();
}

// ================================
// Prevent HTML Injection
// ================================

function escapeHtml(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

async function handlePostActions(event) {
  const button = event.target;

  if (button.classList.contains("like-btn")) {
    const postId = button.dataset.id;
    await toggleLike(postId, button);
    return;
  }

  if (button.classList.contains("delete-btn")) {
    const postId = button.dataset.id;
    // Your existing delete logic
    deletePost(postId);
  }

  if (button.classList.contains("toggle-comments-btn")) {
    const postId = button.dataset.id;
    toggleComments(postId);
    return;
  }

  // Add Comment
  if (button.classList.contains("comment-btn")) {
    await submitComment(button.dataset.id);
    return;
  }

  // Delete Comment
  if (button.classList.contains("delete-comment-btn")) {
    await removeComment(button.dataset.id);
    return;
  }
}

async function toggleLike(postId, button) {
  try {
    button.disabled = true;
    const response = await PostService.toggleLike(postId);
    updateLikeUI(postId, response.likesCount, response.likedByMe);
  }
  catch (error) {
    console.error(error);
    Toast.error(error.message || "Something went wrong.");
  }
  finally {
    button.disabled = false;
  }
}

async function updateLikeUI(postId, likesCount, likedByMe) {

  const likesElement = document.getElementById(`likes-${postId}`);

  if (likesElement) {
    likesElement.textContent = `❤️ ${likesCount} Likes`;
  }

  const button = document.querySelector(`.like-btn[data-id="${postId}"]`);

  if (button) {
    button.textContent = likedByMe ? "❤️ Unlike" : "🤍 Like";
  }
}

async function toggleComments(postId) {

  const section = document.getElementById(`comments-${postId}`);
  section.classList.toggle("hidden");

  if (!section.classList.contains("hidden")) {
    await loadComments(postId);
  }
}

async function loadComments(postId) {
  try {
    const comments = await CommentService.getComments(postId);
    renderComments(postId, comments);
  }

  catch (error) {
    console.error(error);
    Toast.error(error.message || "Something went wrong.");
  }
}

function renderComments(postId, comments) {
  const container = document.querySelector(
    `.comments-list[data-id="${postId}"]`
  );

  container.innerHTML = "";
  if (!comments || comments.length === 0) {
    container.innerHTML = `<div class="empty-state small">
            <p>No comments yet.</p>
        </div>`;
    return;
  }
  const currentUser = Auth.getUser();
  comments.forEach(comment => {
    container.innerHTML += `
        <div class="comment-card">
            <h4>${escapeHtml(comment.author.username)}</h4>
            <p>${escapeHtml(comment.content)}</p>
            <small>${formatDate(comment.createdAt)}</small>
            ${currentUser && comment.author._id === currentUser.id ?
        `<button class="delete-comment-btn" data-id="${comment._id}"> Delete </button>` : ""
      }
        </div>`;
  });
}

async function submitComment(postId) {
  const input = document.querySelector(`.comment-text[data-id="${postId}"]`);
  const content = input.value.trim();

  if (!content) {
    alert("Please enter a comment.");
    return;
  }
  try {
    await CommentService.addComment(
      postId,
      content
    );
    input.value = "";
    await loadComments(postId);
    updateCommentCount(postId, 1);
  }
  catch (error) {
    console.error(error);
    Toast.error(error.message || "Something went wrong.");
  }
}

async function removeComment(commentId) {

  try {
    await CommentService.deleteComment(commentId);
    const card = document.querySelector(`.delete-comment-btn[data-id="${commentId}"]`)?.closest(".comment-card");

    if (card) {
      const commentsList = card.closest(".comments-list");
      const postId = commentsList.dataset.id;
      card.remove();
      updateCommentCount(postId, -1);
    }
  }

  catch (error) {
    console.error(error);
    Toast.error(error.message || "Something went wrong.");
  }
}

function updateCommentCount(postId, change) {
  const counter = document.querySelector(`.comments-count[data-id="${postId}"]`);
  if (!counter) return;

  const current = parseInt(counter.textContent.match(/\d+/)?.[0] || 0, 10);

  counter.textContent = `💬 ${current + change} Comments`;
}