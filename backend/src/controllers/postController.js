import Post from '../models/post.js';
import User from '../models/user.js';

// Create a post
export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Content is required' });
    }

    const post = await Post.create({ content: content.trim(), image, author: req.user._id });
    const populatedPost = await Post.findById(post._id).populate('author', 'firstName lastName email profilePicture');

    res.status(201).json({ success: true, data: populatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create post', error: error.message });
  }
};

export const listPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate('author', 'firstName lastName email profilePicture')
      .populate('comments.user', 'firstName lastName profilePicture');
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to list posts', error: error.message });
  }
};

// Like/Unlike a post
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(req.user._id);
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1); // Unlike
    } else {
      post.likes.push(req.user._id); // Like
    }

    await post.save();
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to toggle like', error: error.message });
  }
};

// Add comment
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Comment text is required' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    post.comments.push({ user: req.user._id, text: text.trim() });
    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate('author', 'firstName lastName profilePicture')
      .populate('comments.user', 'firstName lastName profilePicture');

    res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add comment', error: error.message });
  }
};

// Follow/Unfollow user
export const toggleFollow = async (req, res) => {
  try {
    const targetUserId = req.params.userId;
    if (targetUserId === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot follow yourself' });
    }

    const currentUser = await User.findById(req.user._id);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const followingIndex = currentUser.following.indexOf(targetUserId);
    if (followingIndex > -1) {
      // Unfollow
      currentUser.following.splice(followingIndex, 1);
      targetUser.followers.splice(targetUser.followers.indexOf(req.user._id), 1);
    } else {
      // Follow
      currentUser.following.push(targetUserId);
      targetUser.followers.push(req.user._id);
    }

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({ success: true, message: 'Success', isFollowing: followingIndex === -1 });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to toggle follow', error: error.message });
  }
};
