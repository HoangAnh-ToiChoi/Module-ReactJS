import { createSlice } from "@reduxjs/toolkit";
import { infoUser, register } from "~/service/AuthService/AuthService";

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
    // builder.addCase(register.fulfilled, (state, action) => {
    //   state.user = action.payload.user;
    //   console.log(state.user);
    //   localStorage.setItem("accessToken", action.payload.access_token);
    //   localStorage.setItem("refreshToken", action.payload.refresh_token);
    // });
  },
});

export default AuthSlice.reducer;
