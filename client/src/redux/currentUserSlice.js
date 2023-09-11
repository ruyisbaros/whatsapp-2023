import { createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";
const user = window.localStorage.getItem("registeredUser");
const initialState = {
  loggedUser: user
    ? JSON.parse(user)
    : {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
      },
  status: "",
  error: "",
};

const currentUSlicer = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    reduxLogout: (state, action) => {
      state.status = "";
      state.loggedUser = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
      };
    },
    reduxRegisterUser: (state, action) => {
      const { id, email, name, picture, status } = action.payload;
      state.loggedUser = { id, name, email, picture, status };
    },
  },
});

export const { reduxLogout, reduxRegisterUser } = currentUSlicer.actions;

export default currentUSlicer.reducer;
