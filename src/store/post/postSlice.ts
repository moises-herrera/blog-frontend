import { createSlice } from '@reduxjs/toolkit';
import { PostState } from 'src/interfaces';

const initialState: PostState = {
  posts: [],
  isLoading: false,
  isNewPostFormVisible: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    toggleNewPostFormVisibility: (state) => {
      state.isNewPostFormVisible = !state.isNewPostFormVisible;
    },
  },
});

export const { toggleNewPostFormVisibility } = postSlice.actions;
