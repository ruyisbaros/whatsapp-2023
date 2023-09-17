let users = [];
exports.socketServer = (socket) => {
  console.log(`User with ${socket.id} connected`);
  // new way try
  socket.on("joinUser", (id) => {
    socket.join(id);
  });
  //My old way
  socket.on("joinUser", (id) => {
    const user = users.find((user) => user.id === id);
    if (!user) {
      users.push({ id, socketId: socket.id });
      socket.emit("onlineUsers", users);
    }
    console.log(users);
  });

  //Join a conversation room
  socket.on("Join conversation", (conversation) => {
    socket.join(conversation);
    console.log("User joined conversation: ", conversation);
  });
};
