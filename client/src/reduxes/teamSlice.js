import { makeRequest } from 'configs/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchTeams = createAsyncThunk(
  'team/fetchTeam',
  async ({ searchQuery, limit, offset, orderBy, order }, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get(
        `/team/search?searchQuery=${searchQuery}&offset=${offset}&limit=${limit}&orderBy=${orderBy}&order=${order}`
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
  }
);

export const fetchTeamById = createAsyncThunk(
  'team/fetchTeamById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get(`/team/team_id/${encodeURIComponent(id)}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
  }
);

export const fetch10Teams = createAsyncThunk(
  'team/fetch10Teams',
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get('/team/random_team');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
  }
);

const initialState = {
  teamData: [],
  totalCount: 0,
  loading: false,
  error: null,
};

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.teamData = action.payload.teams;
        state.totalCount = action.payload.totalCount;
        state.loading = false;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeamById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeamById.fulfilled, (state, action) => {
        state.teamData = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeamById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetch10Teams.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch10Teams.fulfilled, (state, action) => {
        state.teamData = action.payload;
        state.loading = false;
      })
      .addCase(fetch10Teams.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default teamSlice.reducer;
