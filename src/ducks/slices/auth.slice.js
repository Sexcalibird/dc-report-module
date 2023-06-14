import { createSlice } from "@reduxjs/toolkit";

const initState = {
  user: undefined,
};

const auth = createSlice({
  name: "page",
  initialState: initState,
  reducers: {
    doLogin: (state, action) => {},
    doLogout: (state) => {},
    updateUser: (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    },
  },
});

export const { doLogin, doLogout, updateUser } = auth.actions;
export const getUser = (state) => state.auth.user

export default auth.reducer;
