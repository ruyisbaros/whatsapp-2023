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
      //1-Create message document in DB
      let createdMessage = await MessageModel.create({
        message,
        sender: my_id,
        conversation: convo_id,
        files: files || [],
      });
      //2. Update relevant conversation's latestMessage (each new message will be latestMessage)
      await ConversationModel.findByIdAndUpdate(convo_id, {
        latestMessage: createdMessage,
      });
      //3-Populate newly created message before send
      const populatedMessage = await MessageModel.findById(createdMessage._id)
        .populate("sender", "-password")
        .populate({
          path: "conversation",
          populate: {
            path: "users",
            select: "-password",
          },
        });
      res.status(201).json(populatedMessage);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  get_messages: async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = messageCtrl;
