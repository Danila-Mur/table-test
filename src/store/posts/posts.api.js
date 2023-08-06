import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({ currentPage, searchValue, sortBy, order }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10&q=${searchValue}&_sort=${sortBy}&_order=${order}`,
  );

  return data;
});
