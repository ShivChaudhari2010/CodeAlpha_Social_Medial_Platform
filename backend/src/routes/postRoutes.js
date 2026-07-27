import express from "express";

import {
  getAllPosts,
  createPost,
  deletePost,
  toggleLike,
  // addComment,
  // getComments
} from "../controllers/postController.js";

import { protect, optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all posts (Public)

router.get("/", optionalAuth, getAllPosts);

// Create post (Protected)
router.post("/", protect, createPost);

// Toggle Like / Unlike
router.post("/:id/like", protect, toggleLike);

// Delete own post (Protected)
router.delete("/:id", protect, deletePost);

// add comments
// router.post("/:id", protect, addComment);
// router.get("/:id", protect, getComments);

export default router;