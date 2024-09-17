import { createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios"; 

export const instanse = axios.create({
    baseURL: 'https://connections-api.goit.global' // Базовий URL для всіх HTTP запитів
});

// Функція для встановлення заголовків авторизації в усіх запитах
const setAuthHeaders = (token) => {
    instanse.defaults.headers.common.Authorization = `Bearer ${token}`; // Додаємо токен до заголовка Authorization
}

// реєстрація користувача
export const register = createAsyncThunk('auth/register',
    async (formData, thunkApi) => {
        try {
            // POST запит 
            const { data } = await instanse.post('/users/signup', formData);
            setAuthHeaders(data.token); 
            return data; 
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    });

export const login = createAsyncThunk('auth/login',
    async (formData, thunkApi) => {
        try {
            // Виконуємо POST запит для входу користувача
            const { data } = await instanse.post('/users/login', formData);
            setAuthHeaders(data.token); 
            return data; // Повертаємо дані відповіді
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    });

export const refreshUser = createAsyncThunk('auth/refresh',
    async (_, thunkApi) => {
        try {
            // Отримуємо токен з глобального стану
            const state = thunkApi.getState();
            const token = state.auth.token;
            setAuthHeaders(token); // Встановлюємо заголовки авторизації з токеном
            const { data } = await instanse.get('/users/current');
            return data; 
        } catch (error) {
    
            return thunkApi.rejectWithValue(error.message);
        }
    }, {
    // Умова для виконання дії: тільки якщо токен існує
    condition: (_, thunkApi) => {
        const state = thunkApi.getState();
        const token = state.auth.token;
        if (token) return true;
        return false;
    }
});

// Створюємо асинхронну дію для виходу користувача
export const logout = createAsyncThunk('auth/logout',
    async (_, thunkApi) => {
        try {
            await instanse.post('/users/logout');
            setAuthHeaders(''); // Очищаємо заголовки авторизації
            return; 
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    });
