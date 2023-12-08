import { createSlice } from '@reduxjs/toolkit';
import { logOut } from 'redux/auth/operations';
import { fetchContacts, addContact, deleteContact } from './operations';

const storedContacts = localStorage.getItem('contacts');
export const contactsInitialState = {
  contacts: storedContacts ? JSON.parse(storedContacts) : [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,

  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [addContact.pending]: handlePending,
    [deleteContact.pending]: handlePending,
    [fetchContacts.rejected]: handleRejected,
    [addContact.rejected]: handleRejected,
    [deleteContact.rejected]: handleRejected,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [logOut.fulfilled](state) {
      state.items = [];
      state.error = null;
      state.isLoading = false;
    },
  },

  // extraReducers: builder => {
  //   builder
  //     .addCase(fetchContacts.pending, state => {
  //       state.isLoading = true;
  //     })
  //     .addCase(fetchContacts.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.error = null;
  //       state.contacts = action.payload;
  //     })
  //     .addCase(fetchContacts.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     })
  //     .addCase(addContact.pending, state => {
  //       state.isLoading = true;
  //     })
  //     .addCase(addContact.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.error = null;
  //       state.contacts.push(action.payload);
  //     })
  //     .addCase(addContact.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     })
  //     .addCase(deleteContact.pending, state => {
  //       state.isLoading = true;
  //     })
  //     .addCase(deleteContact.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.error = null;
  //       const index = state.contacts.findIndex(
  //         contact => contact.id === action.payload.id
  //       );
  //       state.contacts.splice(index, 1);
  //     })
  //     .addCase(deleteContact.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const contactsReducer = contactsSlice.reducer;
