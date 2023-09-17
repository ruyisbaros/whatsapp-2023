import { io } from "socket.io-client";
import { store } from "./redux/store";
import { BACKEND_URL } from "./axios";
let socket;

export const connectToSocketServer = () => {
  socket = io(BACKEND_URL);

  socket.on("connect", () => {
    console.log("Connected to socket io server");
  });
  socket.on("receiveMessage", (msg) => {
    console.log(msg);
  });
};
//Emit user activities
export const joinUser = (id) => {
  socket?.emit("joinUser", id);
};

export const joinAConversation = (convo) => {
  socket?.emit("Join conversation", convo);
};
