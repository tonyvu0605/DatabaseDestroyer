import { makeRequest } from 'configs/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTeamPerformance = createAsyncThunk(
  'team/fetchTeamPerformance',
  async ({ searchQuery, limit, offset, orderBy, order }, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get(`/team/performance?searchQuery=${searchQuery}&offset=${offset}&limit=${limit}&orderBy=${orderBy}&order=${order}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
  }
);

const teamPerformanceSlice = createSlice({
  name: 'teamPerformance',
  initialState: {
    data: [],
    totalCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamPerformance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeamPerformance.fulfilled, (state, action) => {
        state.data = action.payload.teamPerformance;
        state.totalCount = action.payload.totalCount;
        state.loading = false;
      })
      .addCase(fetchTeamPerformance.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default teamPerformanceSlice.reducer;
