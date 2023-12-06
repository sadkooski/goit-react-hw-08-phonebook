import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../redux/actions';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

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
