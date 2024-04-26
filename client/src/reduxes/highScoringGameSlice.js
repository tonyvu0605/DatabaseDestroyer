import { makeRequest } from 'configs/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHighScoringGame = createAsyncThunk(
  'team/fetchHighScoringGame',
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get('/game/high_score');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
  }
);

const highScoringGameSlice = createSlice({
  name: 'highScoringGame',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHighScoringGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHighScoringGame.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchHighScoringGame.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default highScoringGameSlice.reducer;
