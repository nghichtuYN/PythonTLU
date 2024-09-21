import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  access_token: "",
  id: "",
  is_superuser: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, actions) => {
      const {
        first_name = "",
        last_name = "",
        email = "",
        access_token = "",
        id = "",
        is_superuser = false,
      } = actions.payload;
      state.first_name = first_name;
      state.last_name = last_name;
      state.email = email;
      state.id = id;
      state.access_token = access_token;
      state.is_superuser = is_superuser;
    },
    resetUser: (state) => {
      state.first_name = "";
      state.last_name = "";
      state.email = "";
      state.id = "";
      state.access_token = "";
      state.is_superuser = false;
    },
  },
});

export const { updateUser,resetUser } = userSlice.actions;

export default userSlice.reducer;
