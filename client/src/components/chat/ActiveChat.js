import React, { useCallback, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
import { reduxGetMyMessages } from "../../redux/chatSlice";

const ActiveChat = () => {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((store) => store.messages);

  const fetchRelevantMessages = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `/message/get_messages/${activeConversation.latestMessage.conversation}`
      );
      console.log(data);
      dispatch(reduxGetMyMessages(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [activeConversation, dispatch]);

  useEffect(() => {
    fetchRelevantMessages();
  }, [fetchRelevantMessages]);
  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 overflow-hidden">
      <ChatHeader />
      <ChatMessages />
    </div>
  );
};

export default ActiveChat;
