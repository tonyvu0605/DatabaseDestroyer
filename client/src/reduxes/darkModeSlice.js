import { createSlice } from '@reduxjs/toolkit';

// Checks the local storage to initialize the state
const initialState = JSON.parse(localStorage.getItem('darkMode')) || false;

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => !state,
  },
});

// Extract the action creators object and the reducer and exported separately
const { actions, reducer } = darkModeSlice;

export const { toggleDarkMode } = actions;

export default reducer;
