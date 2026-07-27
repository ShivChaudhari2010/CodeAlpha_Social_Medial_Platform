const PostService = {

  // Feed
  async getPosts() {
    const response = await API.get("/posts");
    return response.posts;
  },

  // Create Post
  async createPost(content) {
    const response = await API.post("/posts", { content });
    return response.post;
  },

  // Delete Post
  async deletePost(postId) {
    return await API.delete(`/posts/${postId}`);
  },

  // Toggle Like
  async toggleLike(postId) {
    return await API.post(`/posts/${postId}/like`);
  }
};

window.PostService = PostService;