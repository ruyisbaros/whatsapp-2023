import React, { useCallback, useEffect, useState } from "react";
import SidebarLeft from "../components/sidebar/SidebarLeft";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reduxGetMyConversations } from "../redux/chatSlice";
import WhatsappHome from "../components/chat/WhatsappHome";
import ActiveChat from "../components/chat/ActiveChat";

const Home = () => {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((store) => store.messages);
  //const { loggedUser } = useSelector((store) => store.currentUser);
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
    <div className="relative h-screen dark:bg-dark_bg_1 overflow-hidden borderC">
      <div className="headBanner"></div>
      <div className="container h-[95%] pt-[19px] flex dark:bg-dark_bg_1">
        <SidebarLeft />
        {activeConversation ? <ActiveChat /> : <WhatsappHome />}
      </div>
    </div>
  );
};

export default Home;
