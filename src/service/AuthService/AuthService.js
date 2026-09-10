import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "~/utils/http";

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
