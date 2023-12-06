// import { nanoid } from 'nanoid';
import { createAction, nanoid } from '@reduxjs/toolkit';

export const addContact = createAction(
  'contacts/addContact',
  (name, number) => {
    return {
      payload: {
        name,
        number,
        id: nanoid(),
      },
    };
  }
);

export const deleteContact = createAction(
  'contacts/deleteContact',
  contactId => {
    return {
      payload: contactId,
    };
  }
);

export const setFilter = createAction('filter/setFilter', filter => {
  return {
    payload: filter,
  };
});

// export const addContact = (name, number) => {
//   return {
//     type: 'contacts/addContact',
//     payload: {
//       id: nanoid(),
//       name,
//       number,
//     },
//   };
// };

// export const deleteContact = contactId => {
//   return {
//     type: 'contacts/deleteContact',
//     payload: contactId,
//   };
// };

// export const setFilter = filter => {
//   return {
//     type: 'filter/setFilter',
//     payload: filter,
//   };
// };
