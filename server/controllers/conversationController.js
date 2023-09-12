const ConversationModel = require("../models/conversationModel.js");
const { isConversationExist } = require("../services/conversationServices.js");
const User = require("../models/userModel");

const conversationCtrl = {
  create_open: async (req, res) => {
    try {
      const sender_id = req.user._id;
      const { receiver_id, name } = req.body;

      if (!receiver_id) {
        return res.status(500).json({ message: `Something went wrong!` });
      }
      const withChatUser = await User.findById(receiver_id);
      if (!withChatUser) {
        return res.status(500).json({ message: `Something went wrong!` });
      }
      const exist_conversation = await isConversationExist(
        sender_id,
        receiver_id
      );
      //If not yet created, create it
      if (!exist_conversation) {
        const newConversation = await ConversationModel.create({
          name: withChatUser.name,
          isGroup: false,
          users: [sender_id, receiver_id],
        });
        res.status(200).json(newConversation);
      } else {
        res.status(200).json(exist_conversation);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = conversationCtrl;
