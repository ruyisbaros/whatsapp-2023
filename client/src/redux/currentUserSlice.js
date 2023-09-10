import { createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";

const initialState = {
  loggedUser: {
    id: "",
    name: "hello",
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
    reduxRegisterUser: (state, action) => {},
  },
});

export const { reduxLogout, reduxRegisterUser } = currentUSlicer.actions;

export default currentUSlicer.reducer;
