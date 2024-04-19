import { makeRequest } from 'configs/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchPlayers = createAsyncThunk(
  'players/fetchPlayer',
  async ({searchQuery, limit, offset, orderBy, order}, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get(`/player/search?searchQuery=${searchQuery}&offset=${offset}&limit=${limit}&orderBy=${orderBy}&order=${order}`);

      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
  },
);

export const fetchPlayerById = createAsyncThunk(
  'players/fetchPlayerById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get(`/player/player_id/${encodeURIComponent(id)}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
  },
);

export const fetch10Players = createAsyncThunk(
  'players/fetch10Players',
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get('/player/random');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
  },
);

const initialState = {
  playerData: [],
  totalCount: 0,
  loading: false,
  error: null,
};

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.playerData = action.payload.players;
        state.totalCount = action.payload.totalCount;
        state.loading = false;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
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
      })
      .addCase(fetch10Players.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch10Players.fulfilled, (state, action) => {
        state.playerData = action.payload;
        state.loading = false;
      })
      .addCase(fetch10Players.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default playerSlice.reducer;
