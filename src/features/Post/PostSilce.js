import { createSlice } from "@reduxjs/toolkit";
import { getFeed } from "~/service/PostService/PostService";

const initialState = {
  posts: [],
};

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    toggleSavePost: (state, action) => {
      const targetPost = state.posts.find((p) => p.id === action.payload);
      if (targetPost) {
        targetPost.is_saved_by_auth = !targetPost.is_saved_by_auth;
      }
    },
    HidePostSuccess: (state, action) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFeed.fulfilled, (state, action) => {
      if (action.meta.arg?.page === 1) {
        state.posts = action.payload;
      } else {
        const existingIds = new Set(state.posts.map((p) => p.id));
        const uniqueNewPosts = action.payload.filter(
          (p) => !existingIds.has(p.id),
        );
        state.posts.push(...uniqueNewPosts);
      }
    });

    builder.addCase(getFeed.rejected, (state) => {
      state.posts = [];
    });
  },
});
export const { addPost, toggleSavePost, HidePostSuccess } = PostSlice.actions;
export default PostSlice.reducer;
