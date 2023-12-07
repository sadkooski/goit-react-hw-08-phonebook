import { createSlice, nanoid } from '@reduxjs/toolkit';

const storedContacts = localStorage.getItem('contacts');
export const initialState = {
  contacts: storedContacts ? JSON.parse(storedContacts) : [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState.contacts,

  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
        console.log('State przed usuwaniem:', state.concats, action.payload);
      },
      prepare(data) {
        return {
          payload: {
            name: data.name,
            number: data.number,
            id: nanoid(),
          },
        };
      },
    },

    deleteContact: {
      reducer(state, action) {
        console.log('State przed usuwaniem:', state);

        const index = state.findIndex(task => task.id === action.payload);
        state.splice(index, 1);
        // state.contacts = state.contacts.filter(
        //   contact => contact.id !== action.payload
        // );
        console.log('State po usuwaniu:', state);
      },
      prepare(contactId) {
        return {
          payload: { id: contactId },
        };
      },
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
