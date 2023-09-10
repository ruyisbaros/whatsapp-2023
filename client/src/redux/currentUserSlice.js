import { createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";

const initialState = {
  loggedUser: null,
};

const currentUSlicer = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
});

export const {} = currentUSlicer.actions;

export default currentUSlicer.reducer;
