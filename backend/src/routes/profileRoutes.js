import express from "express";

import {
  getMyProfile,
  updateProfile,
  getMyPosts,
} from "../controllers/profileController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All profile routes require authentication
router.use(protect);

// Get logged-in user's profile
router.get("/me", getMyProfile);

// Update profile
router.put("/", updateProfile);

// Get logged-in user's posts
router.get("/posts", getMyPosts);

export default router;