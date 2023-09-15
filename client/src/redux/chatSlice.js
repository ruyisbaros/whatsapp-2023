import { createSlice } from "@reduxjs/toolkit";
//const user = window.localStorage.getItem("registeredUser");
const initialState = {
  conversations: [],
  messages: [],
  activeConversation: null,
  notifications: [],
  userStatuses: [],
};

const chatSlicer = createSlice({
  name: "messages",
  initialState,
  reducers: {
    reduxSetActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    reduxGetMyConversations: (state, action) => {
      state.conversations = action.payload;
    },
    reduxAddMyConversations: (state, action) => {
      state.conversations.push(action.payload);
    },
    reduxRemoveFromMyConversations: (state, action) => {
      state.conversations.pop(action.payload);
    },
    reduxGetMyMessages: (state, action) => {
      state.messages = action.payload;
    },
    reduxAddMyMessages: (state, action) => {
      state.messages.push(action.payload);
    },
    reduxRemoveFromMyMessages: (state, action) => {
      state.messages.pop(action.payload);
    },
  },
});

export const {
  reduxSetActiveConversation,
  reduxGetMyConversations,
  reduxAddMyConversations,
  reduxRemoveFromMyConversations,
  reduxGetMyMessages,
  reduxAddMyMessages,
  reduxRemoveFromMyMessages,
} = chatSlicer.actions;

export default chatSlicer.reducer;
