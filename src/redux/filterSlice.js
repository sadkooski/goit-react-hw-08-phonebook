import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  filter: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState.filter,

  reducers: {
    setFilter: {
      reducer(state, action) {
        return {
          ...state,
          filter: action.payload,
        };
      },
      prepare(filter) {
        return {
          payload: { filter: filter },
        };
      },
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
