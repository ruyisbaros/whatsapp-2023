import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoWith: null,
  getCall: true,
  callEnded: false,
  callAccepted: false,
  videoWithSocketId: null,
};

const makeVideoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    reduxSetupVideoWith: (state, action) => {
      state.videoWith = action.payload;
    },
    reduxGetVideoCallTrue: (state, action) => {
      state.getCall = true;
    },
    reduxGetVideoCallFalse: (state, action) => {
      state.getCall = false;
    },
    reduxSetCallEnded: (state, action) => {
      state.callEnded = true;
    },
    reduxAcceptVideoCall: (state, action) => {
      state.callAccepted = true;
    },
    reduxRejectVideoCall: (state, action) => {
      state.callAccepted = false;
    },
    reduxSetVideoSocket: (state, action) => {
      state.videoWithSocketId = action.payload;
    },
  },
});

export const {
  reduxSetupVideoWith,
  reduxGetVideoCallTrue,
  reduxGetVideoCallFalse,
  reduxSetCallEnded,
  reduxAcceptVideoCall,
  reduxRejectVideoCall,
  reduxSetVideoSocket,
} = makeVideoSlice.actions;

export default makeVideoSlice.reducer;
