import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Singleton as Authentication } from '.';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
};

export const setAuthentication = createAsyncThunk(
  'AUTH/TOKEN_VALIDITY',
  async () => {
    const auth = Authentication.getInstance();
    await auth.checkTokenValidity();
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeAuthentication: (state) => {
      state.isAuthenticated = false;
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAuthentication.fulfilled, (state /* , action */) => {
      state.isAuthenticated = true;
    });
  },
});

export const { removeAuthentication, setAuthLoading } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectAuthIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;
