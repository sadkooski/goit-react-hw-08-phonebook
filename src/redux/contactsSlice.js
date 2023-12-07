import { createSlice, nanoid } from '@reduxjs/toolkit';

export const initialState = {
  contacts: JSON.parse(localStorage.getItem('contacts')) || [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,

  reducers: {
    addContact: {
      reducer(state, action) {
        console.log('State przed usuwaniem:', state);

        state.contacts.push(action.payload);
      },
      prepare(name, number) {
        return {
          payload: {
            name,
            number,
            id: nanoid(),
          },
        };
      },
    },

    deleteContact: {
      reducer(state, action) {
        console.log('State przed usuwaniem:', state);

        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload
        );
        console.log('State po usuwaniu:', state);
      },
      prepare(contactId) {
        return {
          payload: contactId,
        };
      },
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
