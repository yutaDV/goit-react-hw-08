import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://connections-api.goit.global/users';

export const register = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post(`${BASE_URL}/logout`);
      delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export default userSlice.reducer;
