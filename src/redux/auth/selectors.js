
export const selectUser = state => state.auth.user; // Отримати користувача
export const selectIsLoggedIn = state => state.auth.isLoggedIn; // Перевірити, чи користувач залогінений
export const selectToken = state => state.auth.token; // Отримати токен
export const selectIsRefreshing = state => state.auth.isRefreshing; // Перевірити, чи відбувається оновлення користувача
