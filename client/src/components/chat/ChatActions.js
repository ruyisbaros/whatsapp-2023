import React, { useEffect, useRef, useState } from "react";
import {
  AttachmentIcon,
  CloseIcon,
  EmojiIcon,
  SendIcon,
} from "../../assets/svg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
import { ClipLoader } from "react-spinners";
import {
  reduxAddMyMessages,
  reduxGetMyConversations,
} from "../../redux/chatSlice";
import EmojiPicker from "emoji-picker-react";

const ChatActions = () => {
  const dispatch = useDispatch();
  const messageRef = useRef(null);

  const { activeConversation } = useSelector((store) => store.messages);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      setStatus(true);
      const { data } = await axios.post("/message/send", {
        message,
        convo_id: activeConversation._id,
      });
      console.log(data);
      if (data.conversations) {
        dispatch(
          reduxGetMyConversations(
            data.conversations.filter((dt) => dt.latestMessage)
          )
        );
      }
      dispatch(reduxAddMyMessages(data.populatedMessage));

      setMessage("");
      setStatus(false);
    } catch (error) {
      setStatus(false);
      toast.error(error.response.data.message);
    }
  };
  const handleEmoji = (data) => {
    //console.log(emojiData);
    const { emoji } = data;
    const ref = messageRef.current;
    ref.focus();
    /* const ref = messageRef.current;
    console.log(ref.selectionStart);
    ref.focus();
    const start = message.slice(0, ref.selectionStart);
    console.log(start);
    const end = message.slice(ref.selectionStart);
    console.log(end);
    const newText = start + emoji + end;
    console.log(newText); */
    setMessage((prev) => prev + emoji);
  };
  console.log(message);
  return (
    <form
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0
  py-2 px-4 "
      onSubmit={handleSendMessage}
    >
      <div className="w-full flex items-center gap-x-2 ">
        {/* Icons */}
        <ul className="flex gap-x-2 ">
          <li className="list-none">
            <button
              className="btn"
              type="button"
              onClick={() => setShowEmoji((prev) => !prev)}
            >
              {showEmoji ? (
                <CloseIcon className="dark:fill-dark_svg_1" />
              ) : (
                <EmojiIcon className="dark:fill-dark_svg_1" />
              )}
            </button>
            {showEmoji && (
              <div className="openEmojiAnimation epr-dark-theme absolute bottom-[60px] left-[-0.5px]">
                <EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
              </div>
            )}
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
            ref={messageRef}
          />
        </div>
        {/* Send */}
        <button className="btn" type="submit">
          {status ? (
            <ClipLoader color="#e9edef" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatActions;
