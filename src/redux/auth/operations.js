import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instanse = axios.create({
    baseURL:'https://connections-api.goit.global'
})

const setAuthHeaders = (token) => {
    instanse.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const register = createAsyncThunk('auth/register',
    async (formData, thunkApi) => {
        try {
            const { data } = await instanse.post('/users/signup', formData)
            setAuthHeaders(data.token);
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    });

export const login = createAsyncThunk('auth/login',
    async (formData, thunkApi) => {
        try {
            const { data } = await instanse.post('/users/login', formData)
            setAuthHeaders(data.token);
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    });

export const refreshUser = createAsyncThunk('auth/refresh',
    async (_, thunkApi) => {
        try {
            const state = thunkApi.getState();
            const token = state.auth.token;
            setAuthHeaders(token);
            const { data } = await instanse.get('/users/current')
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }, {
    condition: (_, thunkApi) => {
        const state = thunkApi.getState();
        const token = state.auth.token;
        if (token) return true;
        return false;
    }
});

export const logout = createAsyncThunk('auth/loguot',
    async (_, thunkApi) => {
        try {
            await instanse.post('/users/logout');
            setAuthHeaders('');
            return;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    });