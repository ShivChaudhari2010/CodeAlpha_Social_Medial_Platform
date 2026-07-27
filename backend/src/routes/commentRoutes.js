import express from "express";

import {
  addComment,
  getComments,
  deleteComment
} from "../controllers/commentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
    POST    /api/v1/comments/posts/:id/comments
    GET     /api/v1/comments/posts/:id/comments
*/

router.post( "/posts/:id/comments", protect, addComment);

router.get( "/posts/:id/comments", protect,  getComments );

/*
    DELETE /api/v1/comments/:id
*/

router.delete( "/:id", protect, deleteComment );

export default router;