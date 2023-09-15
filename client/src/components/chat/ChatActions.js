import React, { useState } from "react";
import { AttachmentIcon, EmojiIcon, SendIcon } from "../../assets/svg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
import {
  reduxAddMyMessages,
  reduxGetMyConversations,
} from "../../redux/chatSlice";
//import ChatInput from "./ChatInput";

const ChatActions = () => {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((store) => store.messages);
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/message/send", {
        message,
        convo_id: activeConversation._id,
      });
      console.log(data);
      dispatch(reduxAddMyMessages(data.populatedMessage));
      if (data.conversations) {
        dispatch(
          reduxGetMyConversations(
            data.conversations.filter((dt) => dt.latestMessage)
          )
        );
      }
      //dispatch(reduxUpdateActiveConversation(message));
      setMessage("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <form
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0
  py-2 px-4"
      onSubmit={handleSendMessage}
    >
      <div className="w-full flex items-center gap-x-2 ">
        {/* Icons */}
        <ul className="flex gap-x-2">
          <li className="list-none">
            <button className="btn" type="button">
              <EmojiIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li className="list-none relative">
            <button className="btn" type="button">
              <AttachmentIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
        {/* message input */}
        <div className="w-full ">
          <input
            type="text"
            placeholder="Type a Message"
            className="w-full dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none
              h-[45px] flex-1 rounded-lg pl-4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {/* Send */}
        <button className="btn" type="submit">
          <SendIcon className="dark:fill-dark_svg_1" />
        </button>
      </div>
    </form>
  );
};

export default ChatActions;
