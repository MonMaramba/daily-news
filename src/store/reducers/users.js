import { createSlice } from '@reduxjs/toolkit';
import { addToNewsletter } from '../thunks/thunks';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    action: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToNewsletter.fulfilled, (state, action) => {
      state.loading = false;
      state.action = action.payload;
    });
  },
});

export default usersSlice.reducer;
