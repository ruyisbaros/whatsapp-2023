import React, { useCallback, useEffect, useState } from "react";
import SidebarLeft from "../components/SidebarLeft";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reduxGetMyConversations } from "../redux/chatSlice";
import WhatsappHome from "../components/chat/WhatsappHome";
import ActiveChat from "../components/chat/ActiveChat";

const Home = () => {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((store) => store.messages);
  const [status, setStatus] = useState(false);

  const fetchMyConversations = useCallback(async () => {
    try {
      setStatus(true);
      const { data } = await axios.get("/conversation/my_conversations");
      console.log(data);
      console.log(data.filter((dt) => dt.latestMessage));
      dispatch(reduxGetMyConversations(data.filter((dt) => dt.latestMessage)));
      setStatus(false);
    } catch (error) {
      setStatus(false);
      toast.error(error.response.data.message);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMyConversations();
  }, [fetchMyConversations]);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px]">
      <div className="container h-screen flex py-[19px]">
        <SidebarLeft />
        {activeConversation ? <ActiveChat /> : <WhatsappHome />}
      </div>
    </div>
  );
};

export default Home;
