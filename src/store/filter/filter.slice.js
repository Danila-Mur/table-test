import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  searchValue: '',
  sort: {
    name: 'ID',
    property: 'id',
  },
};

export const filterSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const selectFilter = (state) => state.filterReducer;

export const { setCurrentPage, setSearchValue, setSort } = filterSlice.actions;

export default filterSlice.reducer;
