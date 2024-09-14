
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://connections-api.goit.global/contacts';

// Функція для додавання токена в заголовки запитів
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Токен встановлено:', token); // Друк токена
  } else {
    delete axios.defaults.headers.common['Authorization'];
    console.log('Токен видалено');
  }
};

// Операція для отримання всіх контактів
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.user.token; // Отримуємо токен з Redux store
      console.log('Токен з Redux store:', token);

      if (!token) {
        console.error('Помилка: токен відсутній');
        return thunkAPI.rejectWithValue('No token available');
      }

      setAuthToken(token); // Встановлюємо токен
      const response = await axios.get(BASE_URL); // Запит на отримання контактів
      console.log('Успішний запит, отримані контакти:', response.data);
      return response.data; // Повертаємо дані контактів
    } catch (error) {
      console.error('Помилка отримання контактів:', error.message);
      return thunkAPI.rejectWithValue(error.message); // Обробка помилок
    }
  }
);

// Операція для додавання нового контакту
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.user.token; // Отримуємо токен з Redux store
      console.log('Токен з Redux store для додавання:', token);

      if (!token) {
        console.error('Помилка: токен відсутній');
        return thunkAPI.rejectWithValue('No token available');
      }

      setAuthToken(token); // Встановлюємо токен
      const response = await axios.post(BASE_URL, newContact); // Запит на додавання контакту
      console.log('Успішно доданий контакт:', response.data);
      return response.data; // Повертаємо доданий контакт
    } catch (error) {
      console.error('Помилка додавання контакту:', error.message);
      return thunkAPI.rejectWithValue(error.message); // Обробка помилок
    }
  }
);

// Операція для видалення контакту
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.user.token; // Отримуємо токен з Redux store
      console.log('Токен з Redux store для видалення:', token);

      if (!token) {
        console.error('Помилка: токен відсутній');
        return thunkAPI.rejectWithValue('No token available');
      }

      setAuthToken(token); // Встановлюємо токен
      await axios.delete(`${BASE_URL}/${contactId}`); // Запит на видалення контакту
      console.log('Успішно видалений контакт:', contactId);
      return contactId; // Повертаємо ID видаленого контакту
    } catch (error) {
      console.error('Помилка видалення контакту:', error.message);
      return thunkAPI.rejectWithValue(error.message); // Обробка помилок
    }
  }
);
