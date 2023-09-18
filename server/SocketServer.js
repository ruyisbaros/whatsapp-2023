const { format, formatDistance, formatRelative, subDays } = require("date-fns");

const User = require("./models/userModel");
const { dateHandler } = require("./utils/momentHandler");
let users = [];
exports.socketServer = (socket) => {
  console.log(`User with ${socket.id} connected`);
  //Join User (Online)
  socket.on("joinUser", (id) => {
    const user = users.find((user) => user.id === id);
    if (!user) {
      users.push({ id, socketId: socket.id });
      socket.broadcast.emit("onlineUsers", users);
    }
    console.log(users);
  });

  socket.on("disconnect", async () => {
    const user = users.find((u) => u.socketId === socket.id);
    users = users.filter((user) => user.socketId !== socket.id);
    console.log(users);
    console.log(user);
    const date = new Date();

    if (user) {
      await User.findByIdAndUpdate(user.id, {
        lastSeen: dateHandler(date),
      });
    }
    socket.broadcast.emit("offlineUsers", user?.id);
  });

  //Join a conversation room with conversation id
  socket.on("Join conversation", (conversation) => {
    socket.join(conversation);
    console.log("User joined conversation: ", conversation);
  });

  //Send receive messages
  socket.on("new message", ({ msg, id }) => {
    const user = users.find((user) => user.id === id);
    //console.log("Users: ", users);
    //console.log("User: ", user);

    if (user) {
      socket.to(`${user.socketId}`).emit("new message", msg);
    }
  });

  //Updated conversation list for fresh chat users
  socket.on("update conversationList", ({ newConversation, id }) => {
    const user = users.find((user) => user.id === id);
    console.log(user);
    if (user) {
      socket
        .to(`${user.socketId}`)
        .emit("update conversationList", newConversation);
    }
  });
};
