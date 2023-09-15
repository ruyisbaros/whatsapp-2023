import React from "react";

const ChatInput = () => {
  return (
    <div className="w-full ">
      <input
        type="text"
        placeholder="Type a Message"
        className="w-full dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none
      h-[45px] flex-1 rounded-lg pl-4"
      />
    </div>
  );
};

export default ChatInput;
