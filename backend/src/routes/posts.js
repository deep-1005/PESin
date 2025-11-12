import express from 'express';
import { createPost, listPosts, toggleLike, addComment, toggleFollow } from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public: list posts
router.get('/', protect, listPosts);

// Protected routes
router.post('/', protect, createPost);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/comment', protect, addComment);
router.post('/follow/:userId', protect, toggleFollow);

export default router;
