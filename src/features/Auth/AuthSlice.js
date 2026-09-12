import { createSlice } from "@reduxjs/toolkit";
import { infoUser } from "~/service/AuthService/AuthService";

const initialState = {
  user: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(infoUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(infoUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    });
  },
});

export default AuthSlice.reducer;
