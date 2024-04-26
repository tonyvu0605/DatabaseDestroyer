import { makeRequest } from 'configs/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPlayerSalariesByYear = createAsyncThunk(
  'player/fetchAveragePlayerSalaries',
  async ({ searchQuery, limit, offset, orderBy, order }, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get(`/player/average_salaries?searchQuery=${searchQuery}&offset=${offset}&limit=${limit}&orderBy=${orderBy}&order=${order}`);
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

const playerSalariesSlice = createSlice({
  name: 'averagePlayerSalaries',
  initialState: {
    data: [],
    totalCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayerSalariesByYear.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlayerSalariesByYear.fulfilled, (state, action) => {
        state.data = action.payload.playersSalary;
        state.totalCount = action.payload.totalCount;
        state.loading = false;
      })
      .addCase(fetchPlayerSalariesByYear.rejected, (state, action) => {
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

export default playerSalariesSlice.reducer;
