import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global';

// Функція для встановлення токена
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Реєстрація користувача
export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('/users/signup', credentials);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Логін користувача
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('/users/login', credentials);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Логаут користувача
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    setAuthToken(null);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Оновлення користувача за токеном
export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (!persistedToken) {
    return thunkAPI.rejectWithValue('No token available');
  }

  try {
    setAuthToken(persistedToken);
    const response = await axios.get('/users/current');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
