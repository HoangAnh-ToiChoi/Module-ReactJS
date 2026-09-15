import { createAsyncThunk } from "@reduxjs/toolkit";
import http, { httpClient } from "~/utils/http";

export const getFeed = createAsyncThunk(
  "post/getFeed",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await http.get("/api/posts/feed", {
        params: {
          type: "for_you",
          ...params,
        },
      });
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const likePost = async (id, data) => {
  try {
    const response = await http.post(`/api/posts/${id}/like`, data);
    return response;
  } catch (e) {
    throw e;
  }
};

export const repost = async (id, data) => {
  try {
    const response = await http.post(`/api/posts/${id}/repost`, data);
    return response;
  } catch (e) {
    throw e;
  }
};

export const quotePost = async (id, data) => {
  try {
    const response = await http.post(`/api/posts/${id}/quote`, data);
    return response;
  } catch (e) {
    throw e;
  }
};
