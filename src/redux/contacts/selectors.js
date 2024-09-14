
export const selectContacts = state => state.contacts.items; // Отримати список контактів
export const selectIsLoading = state => state.contacts.loading; // Статус завантаження контактів
export const selectError = state => state.contacts.error; // Статус помилки

// Для фільтрації контактів
export const selectFilteredContacts = (state) => {
  const contacts = state.contacts.items;
  const filter = state.filters.name.toLowerCase();
  return contacts.filter(contact => contact.name.toLowerCase().includes(filter));
};
