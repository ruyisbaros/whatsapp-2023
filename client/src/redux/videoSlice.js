import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  callingUser: null,
  callData: {
    getCall: false,
    videoScreen: false,
    callEnded: false,
    callAccepted: false,
    mySocketId: null,
  },
};

const makeVideoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    reduxSetCallingUser: (state, action) => {
      state.callingUser = action.payload;
    },
    reduxShowVideoTrue: (state, action) => {
      state.callData.videoScreen = true;
    },
    reduxShowVideoFalse: (state, action) => {
      state.callData.videoScreen = false;
    },
    reduxGetVideoCallTrue: (state, action) => {
      state.callData.getCall = true;
    },
    reduxGetVideoCallFalse: (state, action) => {
      state.callData.getCall = false;
    },
    reduxSetCallEnded: (state, action) => {
      state.callData.callEnded = true;
    },
    reduxAcceptVideoCall: (state, action) => {
      state.callData.callAccepted = true;
    },
    reduxRejectVideoCall: (state, action) => {
      state.callData.callAccepted = false;
    },
  },
});

export const {
  reduxGetVideoCallTrue,
  reduxGetVideoCallFalse,
  reduxSetCallEnded,
  reduxAcceptVideoCall,
  reduxRejectVideoCall,
  reduxSetCallingUser,
  reduxShowVideoTrue,
  reduxShowVideoFalse,
} = makeVideoSlice.actions;

export default makeVideoSlice.reducer;
