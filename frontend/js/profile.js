// if (!posts || posts.length === 0) {
//   myPostsContainer.innerHTML = `
//         <div class="empty-state">
//             <div class="empty-icon">👤</div>
//             <h2>No Posts Yet</h2>
//             <p>You haven't created any posts yet.</p>
//         </div>
//     `;

//   return;
// }

// document.addEventListener("DOMContentLoaded", () => {

//   RouteGuard.requireAuth();

//   loadProfile();

//   document.getElementById("editProfileBtn").addEventListener("click", openEditModal);

//   document.getElementById("cancelBtn").addEventListener("click", closeEditModal);

//   document.getElementById("saveProfileBtn").addEventListener("click", saveProfile);

//   function openEditModal() {

//     document.getElementById("editModal").classList.remove("hidden");

//     document.getElementById("editUsername").value = document.getElementById("username").textContent;

//     document.getElementById("editBio").value = document.getElementById("bio").textContent;
//   }

//   function closeEditModal() {
//     document.getElementById("editModal").classList.add("hidden");
//   }

//   async function saveProfile() {

//     const username = document.getElementById("editUsername").value.trim();

//     const bio = document.getElementById("editBio").value.trim();
//     if (!username) {
//       alert("Username is required.");
//       return;
//     }

//     try {
//       const profile = await ProfileService.updateProfile({username, bio, });

//       // Update local storage
//       const user = Auth.getUser();

//       user.username = profile.username;
//       user.bio = profile.bio;

//       localStorage.setItem("user", JSON.stringify(user));
//       closeEditModal();
//       await loadProfile();
//       Toast.success("Profile updated");
//     }catch (error) {
//       Toast.error(error.message || "Something went wrong.");
//     }
//   }
// });

// async function loadProfile() {

//   try {

//     const profile = await ProfileService.getMyProfile();

//     renderProfile(profile);

//     const posts = await ProfileService.getMyPosts();
//     renderPosts(posts);
//   }

//   catch (error) {
//     console.error(error);
//     Toast.error(error.message || "Something went wrong.");
//   }
// }

// function renderProfile(profile) {

//   document.getElementById("username").textContent = profile.username;

//   document.getElementById("email").textContent = profile.email;

//   document.getElementById("bio").textContent = profile.bio || "No bio added.";

//   document.getElementById("followersCount").textContent = profile.followersCount;

//   document.getElementById("followingCount").textContent = profile.followingCount;
// }

// function renderPosts(posts) {

//   document.getElementById("postsCount").textContent = posts.length;

//   const container = document.getElementById("myPostsContainer");
//   container.innerHTML = "";

//   if (posts.length === 0) {
//     container.innerHTML = `<p>No posts yet.</p>`;
//     return;
//   }

//   posts.forEach(post => {
    
//     container.innerHTML += `
// <div class="post">
//     <p>
//         ${escapeHtml(post.content)}
//     </p>
//     <small>
//         ${formatDate(post.createdAt)}
//     </small>
// </div>`;
//   });
// }

// function formatDate(date) {
//   return new Date(date).toLocaleString();
// }

// function escapeHtml(text) {
//   const div = document.createElement("div");
//   div.innerText = text;
//   return div.innerHTML;
// }



document.addEventListener("DOMContentLoaded", () => {

  RouteGuard.requireAuth();

  loadProfile();

  document.getElementById("editProfileBtn").addEventListener("click", openEditModal);

  document.getElementById("cancelBtn").addEventListener("click", closeEditModal);

  document.getElementById("saveProfileBtn").addEventListener("click", saveProfile);

  function openEditModal() {

    document
      .getElementById("editModal")
      .classList.remove("hidden");

    document
      .getElementById("editUsername")
      .value =
      document.getElementById("profileUsername").textContent;

    document
      .getElementById("editBio")
      .value =
      document.getElementById("bio").textContent;

  }

  function closeEditModal() {

    document
      .getElementById("editModal")
      .classList.add("hidden");

  }

  async function saveProfile() {

    const username =
      document
        .getElementById("editUsername")
        .value
        .trim();

    const bio =
      document
        .getElementById("editBio")
        .value
        .trim();

    if (!username) {

      alert("Username is required.");

      return;

    }

    try {

      const profile =
        await ProfileService.updateProfile({

          username,

          bio,

        });

      // Update local storage
      const user = Auth.getUser();

      user.username = profile.username;
      user.bio = profile.bio;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      closeEditModal();

      await loadProfile();

      Toast.success("Profile updated");

    }

    catch (error) {

      Toast.error(error.message || "Something went wrong.");

    }

  }

});

async function loadProfile() {

  try {

    const profile =
      await ProfileService.getMyProfile();

    renderProfile(profile);

    const posts =
      await ProfileService.getMyPosts();

    renderPosts(posts);

  }

  catch (error) {

    console.error(error);

    Toast.error(error.message || "Something went wrong.");

  }

}

function renderProfile(profile) {

  document.getElementById("profileUsername")
    .textContent = profile.username;

  document.getElementById("email")
    .textContent = profile.email;

  document.getElementById("bio")
    .textContent =
    profile.bio || "No bio added.";

  document.getElementById("followersCount")
    .textContent =
    profile.followersCount;

  document.getElementById("followingCount")
    .textContent =
    profile.followingCount;

}

function renderPosts(posts) {

  document.getElementById("postsCount")
    .textContent = posts.length;

  const container =
    document.getElementById("myPostsContainer");

  container.innerHTML = "";

  if (posts.length === 0) {

    container.innerHTML = `
            <p>No posts yet.</p>
        `;

    return;

  }

  posts.forEach(post => {

    container.innerHTML += `

<div class="post">

    <p>

        ${escapeHtml(post.content)}

    </p>

    <small>

        ${formatDate(post.createdAt)}

    </small>

</div>

`;

  });

}

function formatDate(date) {

  return new Date(date)
    .toLocaleString();

}

function escapeHtml(text) {

  const div =
    document.createElement("div");

  div.innerText = text;

  return div.innerHTML;

}