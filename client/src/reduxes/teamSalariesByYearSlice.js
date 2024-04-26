import { makeRequest } from 'configs/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTeamSalaries = createAsyncThunk(
  'team/fetchTeamSalaries',
  async ({ searchQuery, limit, offset, orderBy, order }, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get(`/team/salaries?searchQuery=${searchQuery}&offset=${offset}&limit=${limit}&orderBy=${orderBy}&order=${order}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
  }
);

const teamSalariesSlice = createSlice({
  name: 'teamSalaries',
  initialState: {
    data: [],
    totalCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamSalaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeamSalaries.fulfilled, (state, action) => {
        state.data = action.payload.teamSalaries;
        state.totalCount = action.payload.totalCount;
        state.loading = false;
      })
      .addCase(fetchTeamSalaries.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default teamSalariesSlice.reducer;
