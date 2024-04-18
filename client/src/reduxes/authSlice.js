import { makeRequest } from 'configs/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const loginUser = createAsyncThunk('auth/loginUser', async (loginData, { rejectWithValue }) => {
  try {
    const response = await makeRequest.post(`/auth/login`, loginData);

    return response.data.user;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, confirmPassword }, { rejectWithValue }) => {

    if (password!== confirmPassword) {
      return rejectWithValue('Passwords do not match');
    }

    try {
      const response = await makeRequest.post(`/auth/register`, { email, password, confirmPassword });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  const response = await makeRequest.post(`/auth/logout`, {});
  thunkAPI.dispatch({ type: 'auth/clearState' });
  return response.data;
});

export const updateUserLocalStorage = (user) => ({
  type: 'auth/updateUserLocalStorage',
  payload: user,
});

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.playerData = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = `Login Error: ${action.error.message}` ;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.playerData = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.currentUser = null;
        state.loading = false;
        state.error = null;
      })
      .addCase('auth/updateUserLocalStorage', (state, action) => {
        const currentUserData = JSON.parse(localStorage.getItem('user'));

        state.currentUser = {
          ...currentUserData,
          ...action.payload[0],
        }
      })

  },
});

export default authSlice.reducer;
