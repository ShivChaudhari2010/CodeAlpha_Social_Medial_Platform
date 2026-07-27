const ProfileService = {

  // Get logged-in user's profile
  async getMyProfile() {
    const response = await API.get("/profile/me");
    return response.profile;
  },

  // Get logged-in user's posts
  async getMyPosts() {
    const response = await API.get("/profile/posts");
    return response.posts;
  },

  // Update profile
  async updateProfile(data) {
    const response = await API.put("/profile", data);
    return response.profile;
  }
};