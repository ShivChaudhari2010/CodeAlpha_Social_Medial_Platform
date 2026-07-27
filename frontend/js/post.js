const PostService = {

  // ==========================
  // Get All Posts
  // ==========================

  async getAllPosts() {
    const response = await API.get("/posts");
    return response.posts;
  },

  // ==========================
  // Create Post
  // ==========================

  async createPost(content) {
    const response = await API.post("/posts", {
      content,
    });
    return response.post;
  },

  // ==========================
  // Delete Post
  // ==========================

  async deletePost(postId) {
    return API.delete(`/posts/${postId}`);
  }
};