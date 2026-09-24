import { createAsyncThunk } from "@reduxjs/toolkit";
import http, { httpClient } from "~/utils/http";

export const Login = async (data) => {
  try {
    const response = await http.post("/api/auth/login", data);
    return response;
  } catch (e) {
    throw e;
  }
};

export const infoUser = createAsyncThunk(
  "auth/infoUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get("/api/auth/user");
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const register = async (data) => {
  try {
    const response = await http.post("/api/auth/register", data);
    return response;
  } catch (e) {
    throw e;
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await http.post("/api/auth/forgot-password", data);
    return response;
  } catch (e) {
    throw e;
  }
};

export const validateToken = async (token) => {
  try {
    const response = await httpClient.get("/api/auth/reset-password/validate", {
      params: {
        token: token,
      },
    });
    return response.data.data;
  } catch (e) {
    throw e;
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await httpClient.post("/api/auth/reset-password", data);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const VerifyEmail = async (data) => {
  try {
    const response = await httpClient.post("/api/auth/verify-email", data);
    return response.data;
  } catch (e) {
    throw e;
  }
};
