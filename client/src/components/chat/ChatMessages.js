import React from "react";
import { useSelector } from "react-redux";
import SingleMessage from "./SingleMessage";

const ChatMessages = () => {
  const { messages } = useSelector((store) => store.messages);
  const { loggedUser } = useSelector((store) => store.currentUser);
  return (
    <div className=" mb-[60px] bg-[url('https://res.cloudinary.com/ruyisbaros/image/upload/v1694785109/whatsapp_api/xkiiml6mmcz5xyqkdm42.jpg')] bg-cover bg-no-repeat">
      <div className="scrollbar overflow-scrollbar overflow-auto py-2 px-[5%]">
        {/* Messages */}
        {messages.length > 0 &&
          messages.map((message) => (
            <SingleMessage
              key={message._id}
              msg={message}
              me={loggedUser.id === message.sender._id}
            />
          ))}
      </div>
    </div>
  );
};

export default ChatMessages;
