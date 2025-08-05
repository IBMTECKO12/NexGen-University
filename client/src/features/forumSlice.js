import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { forumService } from '../services/api';

export const fetchForumPosts = createAsyncThunk(
  'forum/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await forumService.getPosts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchForumPostById = createAsyncThunk(
  'forum/fetchPostById',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await forumService.getPostById(postId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createForumPost = createAsyncThunk(
  'forum/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await forumService.createPost(postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  'forum/addComment',
  async ({ postId, content }, { rejectWithValue }) => {
    try {
      const response = await forumService.createComment(postId, { content });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const forumSlice = createSlice({
  name: 'forum',
  initialState: {
    posts: [],
    currentPost: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForumPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForumPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchForumPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch posts';
      })
      .addCase(fetchForumPostById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForumPostById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentPost = action.payload;
      })
      .addCase(fetchForumPostById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch post';
      })
      .addCase(createForumPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createForumPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.unshift(action.payload);
      })
      .addCase(createForumPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to create post';
      })
      .addCase(addComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.currentPost) {
          state.currentPost.comments = action.payload.comments;
        }
        const postIndex = state.posts.findIndex(p => p._id === action.payload._id);
        if (postIndex !== -1) {
          state.posts[postIndex].comments = action.payload.comments;
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to add comment';
      });
  },
});

export default forumSlice.reducer;

