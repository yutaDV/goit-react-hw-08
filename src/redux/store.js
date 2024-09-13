import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import filtersReducer from './filtersSlice';
import userReducer from './userSlice'; 

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
