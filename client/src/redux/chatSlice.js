import { createSlice } from "@reduxjs/toolkit";
//const user = window.localStorage.getItem("registeredUser");
const initialState = {
  conversations: [],
  messages: [],
  activeConversation: null,
  notifications: [],
  userStatuses: [],
  chattedUser: null,
};

const chatSlicer = createSlice({
  name: "messages",
  initialState,
  reducers: {
    reduxSetActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    reduxRemoveActiveConversation: (state, action) => {
      state.activeConversation = null;
    },
    reduxSetChattedUser: (state, action) => {
      state.chattedUser = action.payload;
    },
    reduxGetMyConversations: (state, action) => {
      state.conversations = action.payload;
    },
    reduxAddMyConversations: (state, action) => {
      //console.log(action.payload);
      const newConversation = state.conversations?.find(
        (cnv) => cnv._id === action.payload._id
      );
      if (!newConversation) {
        state.conversations.push(action.payload);
      }
    },
    reduxRemoveFromMyConversations: (state, action) => {
      state.conversations.pop(action.payload);
    },
    reduxGetMyMessages: (state, action) => {
      state.messages = action.payload;
    },
    reduxAddMyMessages: (state, action) => {
      state.messages.push(action.payload);
      //Update latest message
      state.conversations = state.conversations.map((c) =>
        c._id === action.payload.conversation._id
          ? { ...c, latestMessage: action.payload.conversation.latestMessage }
          : c
      );
    },
    reduxAddMyMessagesFromSocket: (state, action) => {
      if (
        state.activeConversation &&
        action.payload?.conversation?._id === state.activeConversation?._id
      ) {
        state.messages.push({ ...action.payload, seen: true });
      } else {
        state.messages.push(action.payload);
      }
      //Update latest message
      state.conversations = state.conversations.map((c) =>
        c._id === action.payload.conversation._id
          ? { ...c, latestMessage: action.payload.conversation.latestMessage }
          : c
      );
    },
    reduxRemoveFromMyMessages: (state, action) => {
      state.messages.pop(action.payload);
    },
    reduxMakeMessagesSeen: (state, action) => {
      const { logId, convoId } = action.payload;
      state.messages = state.messages.map((msg) =>
        msg.sender._id !== logId &&
        !msg.seen &&
        msg.conversation._id === convoId
          ? { ...msg, seen: true }
          : msg
      );
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
  reduxMakeMessagesSeen,
  reduxAddMyMessagesFromSocket,
  reduxSetChattedUser,
  reduxRemoveActiveConversation,
} = chatSlicer.actions;

export default chatSlicer.reducer;
