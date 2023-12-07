import { createSlice, nanoid } from '@reduxjs/toolkit';

const storedContacts = localStorage.getItem('contacts');
export const contactsInitialState = {
  contacts: storedContacts ? JSON.parse(storedContacts) : [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,

  reducers: {
    fetchingInProgress(state) {
      state.isLoading = true;
      console.log('loading');
    },

    fetchingSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.contacts = action.payload;
      console.log('success', action.payload);
    },

    fetchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      console.log('error', action.payload);
    },

    addContact: {
      reducer(state, action) {
        state.contacts.push(action.payload);
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

        const index = state.contacts.findIndex(
          task => task.id === action.payload
        );
        state.contacts.splice(index, 1);
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

export const {
  addContact,
  deleteContact,
  fetchingInProgress,
  fetchingSuccess,
  fetchingError,
} = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
