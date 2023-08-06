import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './filter/filter.slice';
import postsReducer from './posts/posts.slice';

export const store = configureStore({
  reducer: {
    postsReducer,
    filterReducer,
  },
});
