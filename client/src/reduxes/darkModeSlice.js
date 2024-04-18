import { createSlice } from '@reduxjs/toolkit';

// Checks the local storage to initialize the state
const initialState = JSON.parse(localStorage.getItem('darkMode')) || false;

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => !state,
  },
});


export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
