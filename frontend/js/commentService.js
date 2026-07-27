// const CommentService = {

//   // ===========================
//   // Get Comments
//   // ===========================

//   async getComments(postId) {
//     const response = await API.get(`/posts/${postId}/comments`);
//     return response.comments;
//   },

//   // ===========================
//   // Add Comment
//   // ===========================

//   async addComment(postId, content) {
//     const response = await API.post(`/posts/${postId}/comments`,{content});
//     return response.comment;
//   },

//   // ===========================
//   // Delete Comment
//   // ===========================

//   async deleteComment(commentId) {
//     return await API.delete(`/comments/${commentId}`);
//   }
// };


const CommentService = {

  // ===========================
  // Get Comments
  // ===========================

  async getComments(postId) {

    const response = await API.get(

      `/comments/posts/${postId}/comments`

    );

    return response.comments;

  },

  // ===========================
  // Add Comment
  // ===========================

  async addComment(postId, content) {

    const response = await API.post(

      `/comments/posts/${postId}/comments`,

      {

        content

      }

    );

    return response.comment;

  },

  // ===========================
  // Delete Comment
  // ===========================

  async deleteComment(commentId) {

    return await API.delete(

      `/comments/${commentId}`

    );

  }

};