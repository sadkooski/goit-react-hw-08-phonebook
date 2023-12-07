import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../redux/contactsSlice';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { getContacts } from '../redux/selectors';
import { fetchContacts } from '../redux/operations';

const App = () => {
  // const contactsArr = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const { contacts } = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    try {
      const storedContacts = JSON.parse(localStorage.getItem('contacts'));
      if (storedContacts) {
        dispatch(addContact(storedContacts));
      }
    } catch (error) {
      console.error('Error while loading contacts from localStorage:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Error while saving contacts to localStorage:', error);
    }
  }, [contacts]);

  console.log('Stan contacts:', contacts);
  const filteredContacts = contacts.filter(
    contact =>
      typeof contact.name === 'string' &&
      contact.name.toLowerCase().includes(filter)
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      {/* {isLoading && <p>Loading contacts...</p>}
      {error && <p>{error}</p>}
      <p>{contacts.length > 0 && JSON.stringify(contacts, null, 2)}</p> */}
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {filteredContacts.length > 0 && (
        <ContactList contacts={filteredContacts} />
      )}
    </div>
  );
};

export default App;
