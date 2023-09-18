import { createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";
const user = window.localStorage.getItem("registeredUser");
let onUsers = window.localStorage.getItem("onlineUsers");
const initialState = {
  loggedUser: user ? JSON.parse(user) : null,
  onLineUsers: onUsers ? JSON.parse(onUsers) : [],
  status: "",
  error: "",
};

const currentUSlicer = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    reduxLogout: (state, action) => {
      state.status = "";
      state.loggedUser = null;
    },
    reduxRegisterUser: (state, action) => {
      const { id, email, name, picture, status } = action.payload;
      state.loggedUser = { id, name, email, picture, status };
    },
    reduxSetOnlineUsers: (state, action) => {
      state.onLineUsers = action.payload;
    },
    reduxAUserBecameOffline: (state, action) => {
      state.onLineUsers = state.onLineUsers.filter(
        (usr) => usr.id !== action.payload
      );
    },
  },
});

export const {
  reduxLogout,
  reduxRegisterUser,
  reduxSetOnlineUsers,
  reduxAUserBecameOffline,
} = currentUSlicer.actions;

export default currentUSlicer.reducer;
