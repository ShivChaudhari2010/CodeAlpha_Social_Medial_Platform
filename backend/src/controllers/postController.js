// import Post from "../models/Post.js";
// import mongoose from "mongoose";

// // ==========================================
// // Create Post
// // ==========================================

// export const createPost = async (req, res) => {
//   try {

//     const { content } = req.body;

//     if (!content || !content.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Post content is required",
//       });
//     }

//     const post = await Post.create({
//       author: req.user._id,
//       content: content.trim(),
//     });

//     const populatedPost = await Post.findById(post._id)
//       .populate("author", "username profileImage");

//     res.status(201).json({
//       success: true,
//       message: "Post created successfully",
//       post: populatedPost,
//     });

//   } catch (error) {

//     console.error("Create Post Error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       message: error.message,
//       stack: error.stack,
//     });

//   }
// };


// // ==========================================
// // Get All Posts
// // ==========================================

// export const getAllPosts = async (req, res) => {

//   try {

//     const posts = await Post.find({
//       author: req.user._id,
//     })
//       .populate("author", "username profileImage")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: posts.length,
//       posts,
//     });

//   } catch (error) {

//     console.error("Get Posts Error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       message: error.message,
//       stack: error.stack,
//     });

//   }

// };


// // ==========================================
// // Delete Post
// // ==========================================

// export const deletePost = async (req, res) => {

//   try {

//     const post = await Post.findById(req.params.id);

//     if (!post) {

//       return res.status(404).json({
//         success: false,
//         message: "Post not found",
//       });

//     }

//     if (!Array.isArray(post.likes)) {
//       post.likes = [];
//     }

//     if (post.author.toString() !== req.user._id.toString()) {

//       return res.status(403).json({
//         success: false,
//         message: "You can delete only your own posts",
//       });

//     }

//     await post.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "Post deleted successfully",
//     });

//   } catch (error) {
//     console.error("Delete Post Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       message: error.message,
//       stack: error.stack,
//     });
//   }
// };

// // ==========================================
// // Toggle Like / Unlike
// // ==========================================

// export const toggleLike = async (req, res) => {
//   try {
//     const { id } = req.params;
//     // Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid post ID"
//       });
//     }

//     const post = await Post.findById(id);
//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: "Post not found"
//       });
//     }

//     if (!Array.isArray(post.likes)) {
//       post.likes = [];
//     }

//     const userId = req.user._id.toString();
//     const alreadyLiked = post.likes.some(
//       like => like.toString() === userId
//     );
//     let likedByMe;
//     if (alreadyLiked) {
//       post.likes = post.likes.filter(
//         like => like.toString() !== userId
//       );
//       likedByMe = false;
//     } else {
//       post.likes.push(req.user._id);
//       likedByMe = true;
//     }
//     await post.save();
//     return res.status(200).json({
//       success: true,
//       message: likedByMe
//         ? "Post liked successfully"
//         : "Post unliked successfully",
//       likesCount: post.likes.length,
//       likedByMe
//     });
//   }

//   catch (error) {
//     console.error("Toggle Like Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error"
//     });
//   }
// };

import Post from "../models/Post.js";
import mongoose from "mongoose";

// ==========================================
// Create Post
// ==========================================

export const createPost = async (req, res) => {
  try {

    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Post content is required",
      });
    }

    const post = await Post.create({
      author: req.user._id,
      content: content.trim(),
    });

    const populatedPost = await Post.findById(post._id)
      .populate("author", "username profileImage");

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: populatedPost,
    });

  } catch (error) {

    console.error("Create Post Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      message: error.message,
      stack: error.stack,
    });

  }
};


// ==========================================
// Get All Posts
// ==========================================

export const getAllPosts = async (req, res) => {

  try {

    const posts = await Post.find({})
      .populate("author", "username profileImage")
      .sort({ createdAt: -1 });

    const currentUserId = req.user ? req.user._id.toString() : null;

    const formattedPosts = posts.map((post) => {
      const likes = Array.isArray(post.likes) ? post.likes : [];
      return {
        ...post.toObject(),
        likesCount: likes.length,
        likedByMe: currentUserId
          ? likes.some((like) => like.toString() === currentUserId)
          : false,
        isOwner: currentUserId
          ? post.author._id.toString() === currentUserId
          : false,
      };
    });

    res.status(200).json({
      success: true,
      count: formattedPosts.length,
      posts: formattedPosts,
    });

  } catch (error) {

    console.error("Get Posts Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      message: error.message,
      stack: error.stack,
    });

  }

};


// ==========================================
// Delete Post
// ==========================================

export const deletePost = async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    if (!post) {

      return res.status(404).json({
        success: false,
        message: "Post not found",
      });

    }

    if (!Array.isArray(post.likes)) {
      post.likes = [];
    }

    if (post.author.toString() !== req.user._id.toString()) {

      return res.status(403).json({
        success: false,
        message: "You can delete only your own posts",
      });

    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });

  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      message: error.message,
      stack: error.stack,
    });
  }
};

// ==========================================
// Toggle Like / Unlike
// ==========================================

export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID"
      });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    if (!Array.isArray(post.likes)) {
      post.likes = [];
    }

    const userId = req.user._id.toString();
    const alreadyLiked = post.likes.some(
      like => like.toString() === userId
    );
    let likedByMe;
    if (alreadyLiked) {
      post.likes = post.likes.filter(
        like => like.toString() !== userId
      );
      likedByMe = false;
    } else {
      post.likes.push(req.user._id);
      likedByMe = true;
    }
    await post.save();
    return res.status(200).json({
      success: true,
      message: likedByMe
        ? "Post liked successfully"
        : "Post unliked successfully",
      likesCount: post.likes.length,
      likedByMe
    });
  }

  catch (error) {
    console.error("Toggle Like Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};