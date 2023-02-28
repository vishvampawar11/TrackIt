import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const getUser = userSlice.actions.getUser;
export default userSlice.reducer;
