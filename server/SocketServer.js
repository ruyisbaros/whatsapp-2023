let users = [];
exports.socketServer = (socket) => {
  console.log(`User with ${socket.id} connected`);
  // new way try
  /* socket.on("joinUser", (id) => {
    socket.join(id);
  }); */
  //My old way
  socket.on("joinUser", (id) => {
    const user = users.find((user) => user.id === id);
    if (!user) {
      users.push({ id, socketId: socket.id });
      socket.emit("onlineUsers", users);
    }
    //console.log(users);
  });

  socket.on("disconnect", () => {
    const user = users.find((u) => u.socketId === socket.id);
    users = users.filter((user) => user.socketId !== socket.id);
    console.log(users);
    console.log(user);
    socket.emit("offlineUsers", user?.id);
  });

  //Join a conversation room with conversation id
  socket.on("Join conversation", (conversation) => {
    socket.join(conversation);
    console.log("User joined conversation: ", conversation);
  });

  //Send receive messages
  socket.on("new message", ({ msg, id }) => {
    const user = users.find((user) => user.id === id);
    console.log("Users: ", users);
    console.log("User: ", user);

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
