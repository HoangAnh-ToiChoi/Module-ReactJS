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

export const savePost = async (id, data) => {
  try {
    const response = await http.post(`api/posts/${id}/save`, data);
    return response;
  } catch (e) {
    throw e;
  }
};

export const hidePost = async (id, data) => {
  try {
    const response = await http.post(`/api/posts/${id}/hide`, data);
    return response;
  } catch (e) {
    throw e;
  }
};

export const reportPost = async (id, data) => {
  try {
    const response = await http.post(`/api/posts/${id}/report`, data);
    return response;
  } catch (e) {
    throw e;
  }
};

export const muteUser = async (id, data) => {
  try {
    const response = await http.post(`/api/users/${id}/mute`, data);
    return response;
  } catch (e) {
    throw e;
  }
};

export const blockUser = async (id, data) => {
  try {
    const response = await http.post(`/api/users/${id}/block`, data);
    return response;
  } catch (e) {
    throw e;
  }
};

export const editPost = async (id, data) => {
  try {
    const response = await http.post(`api/posts/${id}`, data);
    return response;
  } catch (e) {
    throw e;
  }
};

export const delPost = async (id, data) => {
  try {
    const response = await http.post(`api/posts/${id}`, data);
    return response;
  } catch (e) {
    throw e;
  }
};

export const getFeedSingle = async (id) => {
  try {
    const response = await http.get(`api/posts/${id}`);
    return response;
  } catch (e) {
    throw e;
  }
};

export const getComment = async (id) => {
  try {
    const response = await http.get(`api/posts/${id}/replies`);
    return response;
  } catch (e) {
    throw e;
  }
};

export const postComment = async (id, data) => {
  try {
    const response = await http.post(`/api/posts/${id}/reply`, data);
    return response;
  } catch (e) {
    throw e;
  }
};

