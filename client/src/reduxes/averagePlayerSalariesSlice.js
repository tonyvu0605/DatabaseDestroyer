import { makeRequest } from 'configs/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAveragePlayerSalaries = createAsyncThunk(
  'player/fetchAveragePlayerSalaries',
  async ({ searchQuery, orderBy, order }, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get(`/player/average_salaries?searchQuery=${searchQuery}&orderBy=${orderBy}&order=${order}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
  }
);

export const fetchPlayerSalaryInfo = createAsyncThunk(
  'player/fetchPlayerSalaryInfo',
  async (player_id, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get(`/player/player_salaries?player_id=${player_id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
  }
);

const averagePlayerSalariesSlice = createSlice({
  name: 'averagePlayerSalaries',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAveragePlayerSalaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAveragePlayerSalaries.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchAveragePlayerSalaries.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlayerSalaryInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlayerSalaryInfo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlayerSalaryInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default averagePlayerSalariesSlice.reducer;
