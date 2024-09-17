
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactForm from '../../components/ContactForm/ContactForm';
import { fetchContacts, addContact, deleteContact } from '../../redux/contacts/operations';
import { selectFilteredContacts } from '../../redux/contacts/selectors';
import { selectFilter } from '../../redux/filters/selectors';
import PhoneIcon from '@mui/icons-material/Phone';
import css from './ContactsPage.module.css';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const searchQuery = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleSearchChange = (query) => {
    dispatch({ type: 'filters/setFilter', payload: query });
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleAddContact = (newContact) => {
    dispatch(addContact(newContact));
  };

  return (
    <div className={css.pageContainer}>
      <header className={css.header}>
        <PhoneIcon className={css.phoneIcon} />
        <h1 className={css.title}>Phonebook</h1>
      </header>
      <ContactForm onAddContact={handleAddContact} />
      <SearchBox value={searchQuery} onChange={handleSearchChange} />
      <ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default ContactsPage;
