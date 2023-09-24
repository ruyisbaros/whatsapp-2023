import React, { useCallback, useEffect, useRef, useState } from "react";
import SidebarLeft from "../components/sidebar/SidebarLeft";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reduxGetMyConversations } from "../redux/chatSlice";
import WhatsappHome from "../components/chat/WhatsappHome";
import ActiveChat from "../components/chat/ActiveChat";
import Calls from "../components/video_calls/Calls";

const Home = () => {
  const myVideo = useRef(null);
  const inComingVideo = useRef(null);
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((store) => store.messages);
  const { videoWithSocketId } = useSelector((store) => store.videos);
  //const { loggedUser } = useSelector((store) => store.currentUser);
  console.log(videoWithSocketId);

  const [stream, setStream] = useState();
  const enableMedia = () => {
    myVideo.current.srcObject = stream;
  };
  const callUser = () => {
    enableMedia();
  };

  const setUpMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
      });
  };

  useEffect(() => {
    setUpMedia();
  }, []);

  const fetchMyConversations = useCallback(async () => {
    try {
      const { data } = await axios.get("/conversation/my_conversations");
      console.log(data);
      console.log(data.filter((dt) => dt.latestMessage));
      dispatch(reduxGetMyConversations(data.filter((dt) => dt.latestMessage)));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMyConversations();
  }, [fetchMyConversations]);

  return (
    <>
      <div className="relative h-screen dark:bg-dark_bg_1 overflow-hidden borderC">
        <div className="headBanner"></div>
        <div className="container h-[95%] pt-[19px] flex dark:bg-dark_bg_1">
          <SidebarLeft />
          {activeConversation ? (
            <ActiveChat callUser={callUser} />
          ) : (
            <WhatsappHome />
          )}
        </div>
      </div>
      {/* Calls */}
      <Calls myVideo={myVideo} inComingVideo={inComingVideo} stream={stream} />
    </>
  );
};

export default Home;
