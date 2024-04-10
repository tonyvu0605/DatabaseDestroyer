import { makeRequest } from 'configs/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchPlayerById = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get('/player/player_id');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
  }
);

const initialState = {
  playerData: [],
  loading: false,
  error: null,
};

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlayerById.fulfilled, (state, action) => {
        state.playerData = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlayerById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default playerSlice.reducer;
