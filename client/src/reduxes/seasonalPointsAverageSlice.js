import { makeRequest } from 'configs/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSeasonalPointsAverage = createAsyncThunk(
  'team/fetchSeasonalPointsAverage',
  async ({ searchQuery, orderBy, order }, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get(`/game/seasonal_points_average?searchQuery=${searchQuery}&orderBy=${orderBy}&order=${order}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
  }
);

const seasonalPointsAverageSlice = createSlice({
  name: 'seasonalPointsAverage',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeasonalPointsAverage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSeasonalPointsAverage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchSeasonalPointsAverage.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default seasonalPointsAverageSlice.reducer;
