import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const storedContacts = localStorage.getItem('contacts');
export const contactsInitialState = {
  contacts: storedContacts ? JSON.parse(storedContacts) : [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,

  // reducers: {
  //   // fetchingInProgress(state) {
  //   //   state.isLoading = true;
  //   //   console.log('loading');
  //   // },

  //   // fetchingSuccess(state, action) {
  //   //   state.isLoading = false;
  //   //   state.error = null;
  //   //   state.contacts = action.payload;
  //   //   console.log('success', action.payload);
  //   // },

  //   // fetchingError(state, action) {
  //   //   state.isLoading = false;
  //   //   state.error = action.payload;
  //   //   console.log('error', action.payload);
  //   // },

  //   // addContact: {
  //   //   reducer(state, action) {
  //   //     state.contacts.push(action.payload);
  //   //     console.log('State przed usuwaniem:', state.concats, action.payload);
  //   //   },
  //   //   prepare(data) {
  //   //     return {
  //   //       payload: {
  //   //         name: data.name,
  //   //         number: data.number,
  //   //         id: nanoid(),
  //   //       },
  //   //     };
  //   //   },
  //   // },

  //   deleteContact: {
  //     reducer(state, action) {
  //       console.log('State przed usuwaniem:', state);

  //       const index = state.contacts.findIndex(
  //         task => task.id === action.payload
  //       );
  //       state.contacts.splice(index, 1);
  //       // state.contacts = state.contacts.filter(
  //       //   contact => contact.id !== action.payload
  //       // );
  //       console.log('State po usuwaniu:', state);
  //     },
  //     prepare(contactId) {
  //       return {
  //         payload: { id: contactId },
  //       };
  //     },
  //   },
  // },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(index, 1);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
  // extraReducers: (builder) => {
  //   builder
  //       .addCase(fetchContacts.pending, (state, action) {      state.isLoading = true;
  //         console.log('loading');})
  //       .addCase(fetchContacts.fulfilled, (state, action) {  state.isLoading = false;
  //         state.error = null;
  //         state.contacts = action.payload;
  //         console.log('success', action.payload);})
  //       .addCase(fetchContacts.rejected, (state, action) {state.isLoading = false;
  //         state.error = action.payload;
  //         console.log('error', action.payload);})
  // },
});

export const contactsReducer = contactsSlice.reducer;
