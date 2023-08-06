import { createSlice } from '@reduxjs/toolkit';

import { fetchPosts } from './posts.api';

const initialState = {
  posts: [],
  status: 'loading' | 'success' | 'error',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'loading';
      state.posts = [];
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'success';
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.status = 'error';
      state.posts = [];
    });
  },
});

export const selectPosts = (state) => state.postsReducer;

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
