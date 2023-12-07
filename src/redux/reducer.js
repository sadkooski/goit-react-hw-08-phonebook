// import { combineReducers } from 'redux';
// import { addContact, deleteContact, setFilter } from './actions';
// import { createReducer } from '@reduxjs/toolkit';

// export const initialState = {
//   contacts: JSON.parse(localStorage.getItem('contacts')) || [],
//   filter: '',
// };

// export const contactsReducer = createReducer(initialState, {
//   [addContact]: (state, action) => {
//     return [...state, action.payload];
//   },
//   [deleteContact]: (state, action) => {
//     return state.filter(contact => contact.id !== action.payload);
//   },
// });

// export const filterReducer = createReducer(initialState, {
//   [setFilter]: (state, action) => {
//     return action.payload;
//   },
// });

// export default combineReducers({
//   contacts: contactsReducer,
//   filter: filterReducer,
// });

// const contactsReducer = (state = initialState.contacts, action) => {
//   switch (action.type) {
//     case addContact.type:
//       return [...state, action.payload];
//     case deleteContact.type:
//       return state.filter(contact => contact.id !== action.payload);
//     default:
//       return state;
//   }
// };

// const filterReducer = (state = initialState.filter, action) => {
//   switch (action.type) {
//     case setFilter.type:
//       return action.payload;
//     default:
//       return state;
//   }
// };
