import { createSlice } from '@reduxjs/toolkit';
import { setFilter } from './operations';

export const filterInitialState = {
  filter: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,

  // reducers: {
  //   setFilter: {
  //     reducer(state, action) {
  //       return {
  //         ...state,
  //         filter: action.payload,
  //       };
  //     },
  //     prepare(filter) {
  //       return {
  //         payload: { filter: filter },
  //       };
  //     },
  //   },
  // },

  extraReducers: builder => {
    builder.addCase(setFilter.fulfilled, (state, action) => {
      state.filter = action.payload;
    });
  },
});

// export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
