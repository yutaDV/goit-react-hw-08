
import { createAsyncThunk } from "@reduxjs/toolkit";
import { instanse } from "../auth/operations";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
    try {
        const { data } = await instanse.get('/contacts')
        return data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message)
    }
})

export const addContact = createAsyncThunk("contacts/addContact", async (contact, thunkAPI) => {
    try {
        const { data } = await instanse.post('/contacts', contact)
        return data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message)
    }
})

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId, thunkAPI) => {
    try {
        const { data } = await instanse.delete(`/contacts/${contactId}`)
        return data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message)
    }
})