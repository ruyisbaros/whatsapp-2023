const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const conversationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },
    users: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: ObjectId,
      ref: "Message",
    },
    admin: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, collection: "conversations" }
);

const ConversationModel = mongoose.model("Conversation", conversationSchema);

module.exports = ConversationModel;
