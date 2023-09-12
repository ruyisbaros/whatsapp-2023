import React, { useCallback, useEffect, useState } from "react";
import SidebarLeft from "../components/SidebarLeft";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { reduxGetMyConversations } from "../redux/chatSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);

  const fetchMyConversations = useCallback(async () => {
    try {
      setStatus(true);
      const { data } = await axios.get("/conversation/my_conversations");
      console.log(data);
      dispatch(reduxGetMyConversations(data));
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
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px]">
      <div className="container flex">
        <SidebarLeft />
      </div>
    </div>
  );
};

export default Home;
