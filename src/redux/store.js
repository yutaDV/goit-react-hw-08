import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Локальне сховище
import contactsReducer from './contacts/slice';
import filtersReducer from './filters/slice';
import authReducer from './auth/slice';

// Налаштування для персистентного збереження токена
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'], // Зберігаємо тільки токен
};

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
    auth: persistReducer(authPersistConfig, authReducer), // Персистентний authReducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Створення persistor для ініціалізації персистенції
export const persistor = persistStore(store);

