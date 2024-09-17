
import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectFilter], (contacts, filterValue) =>
    contacts.filter(contact => {
        return contact.name.toLowerCase().includes(filterValue.toLowerCase());
    }));