const MessageModel = require("../models/messageModel");
const ConversationModel = require("../models/conversationModel.js");
const User = require("../models/userModel");

const messageCtrl = {
  send_create_message: async (req, res) => {
    try {
      const my_id = req.user._id;
      const { message, convo_id, files } = req.body;
      if (!convo_id || (!message && files.length <= 0)) {
        return res.status(500).json({ message: `Something went wrong!` });
      }
      //We will check if it is a first time chat
      let conversations = null;
      const messages = await MessageModel.find({
        conversation: convo_id,
      });
      //1-Create message document in DB
      const createdMessage = await MessageModel.create({
        message,
        sender: my_id,
        conversation: convo_id,
        files: files || [],
      });
      //2. Update relevant conversation's latestMessage (each new message will be the latestMessage)
      await ConversationModel.findByIdAndUpdate(convo_id, {
        latestMessage: createdMessage,
      });
      //3. IMPORTANT. if below returns 0 means first time chat started. So
      //we will send conversations only for newly started chats between 2 users. Not always
      if (messages.length === 0) {
        conversations = await ConversationModel.find({
          users: { $elemMatch: { $eq: req.user._id } },
        })
          .populate("users", "-password")
          .populate("admin", "-password")
          .populate({
            path: "latestMessage",
            model: "Message",
            populate: {
              path: "sender",
              model: "User",
            },
          })
          .sort({ updatedAt: -1 });
      }
      //4 -Populate newly created message before send
      const populatedMessage = await MessageModel.findById(createdMessage._id)
        .populate("sender", "-password")
        .populate({
          path: "conversation",
          populate: {
            path: "users",
            select: "-password",
          },
          populate: {
            path: "latestMessage",
          },
        });
      res.status(201).json({ populatedMessage, conversations });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  get_messages: async (req, res) => {
    try {
      const { convId } = req.params;
      if (!convId) {
        return res.status(500).json({ message: `Something went wrong!` });
      }
      const messages = await MessageModel.find({
        conversation: convId,
      }).populate("sender", "-password");
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  searchChatUsers: async (req, res) => {
    try {
      const { search } = req.query;
      const users = await User.find({
        $and: [
          { name: { $regex: search, $options: "i" } },
          { _id: { $ne: req.user._id } },
        ],
      }).select("-password");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = messageCtrl;
