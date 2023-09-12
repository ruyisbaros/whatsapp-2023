const ConversationModel = require("../models/conversationModel.js");

exports.isConversationExist = async (sId, rId) => {
  let conversation = await ConversationModel.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: sId } } },
      { users: { $elemMatch: { $eq: rId } } },
    ],
  })
    .populate("users", "-password")
    .populate({
      path: "latestMessage.sender",
      model: "User",
      select: "-password",
    });

  return conversation[0];
};
