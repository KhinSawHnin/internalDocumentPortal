import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  deletingUserId: null,
};

const userSlice = createSlice({
  name: 'usersUi',
  initialState,
  reducers: {
    setDeletingUserId: (state, action) => {
      state.deletingUserId = action.payload;
    },
  },
});

export const { setDeletingUserId } = userSlice.actions;
export default userSlice.reducer;
