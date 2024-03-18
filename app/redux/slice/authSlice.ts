import { createSlice } from "@reduxjs/toolkit";
import User from "../../types/User";

type AuthState = {
  token: string | null;
  user?: User;
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  token: null,
  user: undefined,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.userAuth;
      state.token = action.payload.userJwt;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = undefined;
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
