import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deletingDocumentId: null,
};

const documentSlice = createSlice({
  name: 'documentsUi',
  initialState,
  reducers: {
    setDeletingDocumentId: (state, action) => {
      state.deletingDocumentId = action.payload;
    },
  },
});

export const { setDeletingDocumentId } = documentSlice.actions;
export default documentSlice.reducer;
