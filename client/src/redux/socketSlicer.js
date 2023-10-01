import { createSlice } from "@reduxjs/toolkit";

import { io } from "socket.io-client";
import { BACKEND_URL } from "../axios";

const initialState = {
  socket: "",
};

const makeSocket = createSlice({
  name: "sockets",
  initialState,
  reducers: {
    createSocket: (state, action) => {
      state.socket = io(BACKEND_URL);
    },
  },
});

export const { createSocket } = makeSocket.actions;
export default makeSocket.reducer;
