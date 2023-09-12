const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
    conversation: {
      type: ObjectId,
      ref: "Conversation",
    },
    files: Array,
  },
  { timestamps: true, collection: "messages" }
);
const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;
