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
export const { addPost } = PostSlice.actions;
export default PostSlice.reducer;
