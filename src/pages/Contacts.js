import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { fetchContacts, addContact } from '../redux/contacts/operations';
import {
  selectContacts,
  selectFilter,
  selectIsLoading,
} from '../redux/contacts/selectors';

export default function Contacts() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const { contacts } = useSelector(selectContacts);
  const { filter } = useSelector(selectFilter);

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
    <>
      <Helmet>
        <title>Your contacts</title>
      </Helmet>
      <div>{isLoading && 'Request in progress...'}</div>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {filteredContacts.length > 0 && (
        <ContactList contacts={filteredContacts} />
      )}
    </>
  );
}
