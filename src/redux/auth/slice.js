import { createSlice } from "@reduxjs/toolkit"
import { login, logout, refreshUser, register } from "./operations"

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => builder.
    addCase(register.pending, (state) => {
      state.error = null;
    }).
    addCase(register.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user
    }).addCase(register.rejected, (state, action) => {
      state.error = action.payload;
    }).
    addCase(login.pending, (state) => {
      state.error = null;
    }).
    addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user
    }).addCase(login.rejected, (state, action) => {
      state.error = action.payload;
    }).
    addCase(refreshUser.pending, (state) => {
      state.error = null;
      state.isRefreshing = true;
    }).
    addCase(refreshUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.isRefreshing = false;
      state.user = action.payload
    }).addCase(refreshUser.rejected, (state, action) => {
      state.error = action.payload;
      state.isRefreshing = false;
    }).
    addCase(logout.pending, (state) => {
      state.error = null;
    }).
    addCase(logout.fulfilled, () => {
      return initialState;
    }).
    addCase(logout.rejected, (state, action) => {
      state.error = action.payload;
    })
})

export const authReducer = authSlice.reducer