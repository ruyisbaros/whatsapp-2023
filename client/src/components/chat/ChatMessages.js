import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SingleMessage from "./SingleMessage";

const ChatMessages = () => {
  const endRef = useRef();
  const { messages, chattedUser, isTyping, typeTo } = useSelector(
    (store) => store.messages
  );
  const { loggedUser } = useSelector((store) => store.currentUser);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);
  return (
    <div className=" mb-[60px] bg-[url('https://res.cloudinary.com/ruyisbaros/image/upload/v1694785109/whatsapp_api/xkiiml6mmcz5xyqkdm42.jpg')] bg-cover bg-no-repeat ">
      <div className="scrollBar overflow-scrollbar overflow-auto py-2 px-[5%]">
        {/* Messages */}
        {messages.length > 0 &&
          messages
            .filter(
              (msg) =>
                msg.sender._id === chattedUser?._id ||
                msg.sender._id === loggedUser?.id
            )
            .map((message) => (
              <SingleMessage
                key={message._id}
                msg={message}
                me={loggedUser.id === message.sender?._id}
              />
            ))}
        {isTyping && typeTo === chattedUser._id ? "typing..." : ""}
        <div ref={endRef} className="h-[30px]"></div>
      </div>
    </div>
  );
};

export default ChatMessages;
