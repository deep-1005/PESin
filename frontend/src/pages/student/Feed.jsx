import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  CircularProgress,
  AppBar,
  Toolbar,
  Divider,
  Grid,
  Chip,
  InputAdornment
} from '@mui/material';
import { 
  Send, 
  ArrowBack, 
  ThumbUp, 
  ThumbUpOutlined, 
  Comment, 
  PersonAdd,
  PersonRemove,
  EmojiEvents
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Feed = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postContent, setPostContent] = useState('');
  const [posting, setPosting] = useState(false);
  const [commentText, setCommentText] = useState({});
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load posts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!postContent.trim()) {
      toast.error('Please write something');
      return;
    }

    setPosting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/posts',
        { content: postContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success('Post created successfully!');
        setPostContent('');
        fetchPosts();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create post');
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPosts();
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  const handleComment = async (postId) => {
    const text = commentText[postId];
    if (!text?.trim()) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/posts/${postId}/comment`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentText({ ...commentText, [postId]: '' });
      fetchPosts();
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleFollow = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/posts/follow/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.isFollowing ? 'Following user!' : 'Unfollowed user');
        fetchPosts();
      }
    } catch (error) {
      toast.error('Failed to follow user');
    }
  };

  const isLikedByMe = (post) => {
    return post.likes?.some(like => like.toString() === user._id || like._id === user._id);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString();
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #1e88e5 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/student/dashboard')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, ml: 2 }}>
            PESin Community Feed
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Left Sidebar - Profile Card */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', position: 'sticky', top: 20 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {user?.branch} • Semester {user?.semester}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Connections:</strong> {user?.connections?.length || 0}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Followers:</strong> {user?.followers?.length || 0}
                </Typography>
                <Typography variant="body2">
                  <strong>Following:</strong> {user?.following?.length || 0}
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigate('/student/profile')}
              >
                View Profile
              </Button>
            </Paper>
          </Grid>

          {/* Main Feed */}
          <Grid item xs={12} md={9}>
            {/* Create Post */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Avatar
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    width: 50,
                    height: 50
                  }}
                >
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </Avatar>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Share your achievements, certifications, or thoughts..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  variant="outlined"
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  endIcon={posting ? <CircularProgress size={20} color="inherit" /> : <Send />}
                  onClick={handleCreatePost}
                  disabled={posting || !postContent.trim()}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    px: 4
                  }}
                >
                  Post
                </Button>
              </Box>
            </Paper>

            {/* Posts Feed */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : posts.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                <Typography variant="h6" color="text.secondary">
                  No posts yet. Be the first to share! 🚀
                </Typography>
              </Paper>
            ) : (
              posts.map((post) => (
                <Card key={post._id} sx={{ mb: 3, borderRadius: 3 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={post.author?.profilePicture}
                        sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                      >
                        {post.author?.firstName?.[0]}{post.author?.lastName?.[0]}
                      </Avatar>
                    }
                    title={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {post.author?.firstName} {post.author?.lastName}
                        </Typography>
                        {post.author?._id !== user._id && (
                          <IconButton
                            size="small"
                            onClick={() => handleFollow(post.author._id)}
                            sx={{ ml: 'auto' }}
                          >
                            <PersonAdd fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    }
                    subheader={formatDate(post.createdAt)}
                  />
                  <CardContent>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
                      {post.content}
                    </Typography>

                    {/* Like & Comment Stats */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 2, color: 'text.secondary' }}>
                      <Typography variant="body2">
                        {post.likes?.length || 0} {post.likes?.length === 1 ? 'like' : 'likes'}
                      </Typography>
                      <Typography variant="body2">
                        {post.comments?.length || 0} {post.comments?.length === 1 ? 'comment' : 'comments'}
                      </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        startIcon={isLikedByMe(post) ? <ThumbUp /> : <ThumbUpOutlined />}
                        onClick={() => handleLike(post._id)}
                        sx={{
                          flex: 1,
                          color: isLikedByMe(post) ? '#667eea' : 'text.secondary'
                        }}
                      >
                        Like
                      </Button>
                      <Button
                        startIcon={<Comment />}
                        onClick={() => setShowComments({ ...showComments, [post._id]: !showComments[post._id] })}
                        sx={{ flex: 1 }}
                      >
                        Comment
                      </Button>
                    </Box>

                    {/* Comments Section */}
                    {showComments[post._id] && (
                      <Box sx={{ mt: 2 }}>
                        <Divider sx={{ mb: 2 }} />
                        {post.comments?.map((comment, idx) => (
                          <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Avatar
                              src={comment.user?.profilePicture}
                              sx={{ width: 32, height: 32 }}
                            >
                              {comment.user?.firstName?.[0]}
                            </Avatar>
                            <Box sx={{ flex: 1, bgcolor: '#f3f4f6', p: 1.5, borderRadius: 2 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {comment.user?.firstName} {comment.user?.lastName}
                              </Typography>
                              <Typography variant="body2">{comment.text}</Typography>
                            </Box>
                          </Box>
                        ))}
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                          <Avatar sx={{ width: 32, height: 32 }}>
                            {user?.firstName?.[0]}
                          </Avatar>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Write a comment..."
                            value={commentText[post._id] || ''}
                            onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleComment(post._id);
                              }
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={() => handleComment(post._id)} size="small">
                                    <Send fontSize="small" />
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                          />
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Feed;
