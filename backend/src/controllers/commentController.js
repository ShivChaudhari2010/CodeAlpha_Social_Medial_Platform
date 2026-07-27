import mongoose from "mongoose";

import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// =========================================
// Add Comment
// =========================================

export const addComment = async (req, res) => {

  try {

    const { id: postId } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {

      return res.status(400).json({

        success: false,
        message: "Invalid post ID"

      });

    }

    if (!content || !content.trim()) {

      return res.status(400).json({

        success: false,
        message: "Comment content is required"

      });

    }

    const post = await Post.findById(postId);

    if (!post) {

      return res.status(404).json({

        success: false,
        message: "Post not found"

      });

    }

    const comment = await Comment.create({

      content: content.trim(),

      author: req.user._id,

      post: postId

    });

    post.commentsCount += 1;

    await post.save();

    await comment.populate(
      "author",
      "username profileImage"
    );

    return res.status(201).json({

      success: true,

      message: "Comment added successfully",

      comment

    });

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error"

    });

  }

};

// =========================================
// Get Comments
// =========================================

export const getComments = async (req, res) => {

  try {

    const { id: postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {

      return res.status(400).json({

        success: false,

        message: "Invalid post ID"

      });

    }

    const comments = await Comment
      .find({

        post: postId

      })

      .populate(

        "author",

        "username profileImage"

      )

      .sort({

        createdAt: -1

      });

    return res.status(200).json({

      success: true,

      count: comments.length,

      comments

    });

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error"

    });

  }

};

// =========================================
// Delete Comment
// =========================================

export const deleteComment = async (req, res) => {

  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {

      return res.status(400).json({

        success: false,

        message: "Invalid comment ID"

      });

    }

    const comment = await Comment.findById(id);

    if (!comment) {

      return res.status(404).json({

        success: false,

        message: "Comment not found"

      });

    }

    if (

      comment.author.toString()

      !==

      req.user._id.toString()

    ) {

      return res.status(403).json({

        success: false,

        message: "Not authorized"

      });

    }

    await Comment.findByIdAndDelete(id);

    await Post.findByIdAndUpdate(

      comment.post,

      {

        $inc: {

          commentsCount: -1

        }

      }

    );

    return res.status(200).json({

      success: true,

      message: "Comment deleted successfully"

    });

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error"

    });

  }

};