import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //  стан у localStorage
import authReducer from './auth/slice'; // Твій authSlice
import contactsReducer from './contacts/slice'; // Слайс контактів
import filtersReducer from './filters/slice'; // Слайс фільтрів

// Налаштування для збереження токена
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'], // Тільки поле token буде збережено в localStorage
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Конфігурація стора
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // слайс auth підтримує персистенцію токена
    contacts: contactsReducer,
    filters: filtersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Щоб уникнути помилок серіалізації
    }),
});

// Створюємо persistor
export const persistor = persistStore(store);
