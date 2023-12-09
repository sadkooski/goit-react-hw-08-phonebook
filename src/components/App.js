import React, { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictefRoute';
import { refreshUser } from '../redux/auth/operations';
import { useAuth } from 'hooks';
import { Layout } from './Layout';

const HomePage = lazy(() => import('../pages/Home'));
const RegisterPage = lazy(() => import('../pages/Register'));
const LoginPage = lazy(() => import('../pages/Login'));
const ContactsPage = lazy(() => import('../pages/Contacts'));

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;

// import { addContact } from '../redux/contactsSlice';
// import { addContact } from '../redux/operations';
// import {
//   selectContacts,
//   selectFilter,
//   selectError,
//   selectIsLoading,
// } from '../redux/selectors';
// import { fetchContacts } from '../redux/operations';

// import { ContactForm } from 'components/ContactForm/ContactForm';
// import { Filter } from 'components/Filter/Filter';
// import { ContactList } from 'components/ContactList/ContactList';
//   useEffect(() => {
//   dispatch(fetchContacts());
// }, [dispatch]);

// const isLoading = useSelector(selectIsLoading);
// const error = useSelector(selectError);
// const { contacts } = useSelector(selectContacts);
// const { filter } = useSelector(selectFilter);

// useEffect(() => {
//   try {
//     const storedContacts = JSON.parse(localStorage.getItem('contacts'));
//     if (storedContacts) {
//       dispatch(addContact(storedContacts));
//     }
//   } catch (error) {
//     console.error('Error while loading contacts from localStorage:', error);
//   }
// }, [dispatch]);

// useEffect(() => {
//   try {
//     localStorage.setItem('contacts', JSON.stringify(contacts));
//   } catch (error) {
//     console.error('Error while saving contacts to localStorage:', error);
//   }
// }, [contacts]);

// console.log('Stan contacts:', contacts);
// const filteredContacts = contacts.filter(
//   contact =>
//     typeof contact.name === 'string' &&
//     contact.name.toLowerCase().includes(filter)
// );
// //  {isLoading && <p>Loading contacts...</p>}
//     {error && <p>{error}</p>}
//     // <p>{contacts.length > 0 && JSON.stringify(contacts, null, 2)}</p> */}
//     {isLoading && !error && <b>Request in progress...</b>}
//     {/* <h1>Phonebook</h1>
//     <ContactForm />
//     <h2>Contacts</h2>
//     <Filter /> */}
//     {/* {filteredContacts.length > 0 && (
//       <ContactList contacts={filteredContacts} />
//     )}
