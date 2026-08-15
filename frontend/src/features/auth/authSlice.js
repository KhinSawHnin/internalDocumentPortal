import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  role: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.role = user?.role ?? null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
export const selectIsAdmin = (state) => state.auth.role === 'admin';

export default authSlice.reducer;
