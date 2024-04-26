import { makeRequest } from 'configs/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchTopPlayerSalaries = createAsyncThunk(
  'topPlayerSalaries/fetchTopPlayerSalaries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get('/player/top_salaries');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
  }
);

const topPlayerSalariesSlice = createSlice({
  name: 'topPlayerSalaries',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopPlayerSalaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopPlayerSalaries.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopPlayerSalaries.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default topPlayerSalariesSlice.reducer;
