import React, { useCallback, useEffect, useRef, useState } from "react";
import SidebarLeft from "../components/sidebar/SidebarLeft";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reduxGetMyConversations } from "../redux/chatSlice";
import WhatsappHome from "../components/chat/WhatsappHome";
import ActiveChat from "../components/chat/ActiveChat";
import Calls from "../components/video_calls/Calls";
import Peer from "simple-peer";
import { answerCallUserSocket, callAUserSocket } from "../SocketIOConnection";
import { reduxAcceptVideoCall, reduxShowVideoTrue } from "../redux/videoSlice";
import { reduxMakeTokenExpired } from "../redux/currentUserSlice";

const Home = () => {
  const myVideo = useRef(null);
  const inComingVideo = useRef(null);
  const connectionRef = useRef(null);
  const dispatch = useDispatch();
  const { activeConversation, chattedUser } = useSelector(
    (store) => store.messages
  );
  const { mySocketId, callAccepted } = useSelector(
    (store) => store.videos.callData
  );
  const { socket } = useSelector((store) => store.sockets);
  const { loggedUser } = useSelector((store) => store.currentUser);
  //const { loggedUser } = useSelector((store) => store.currentUser);
  const { callingUser } = useSelector((store) => store.videos);
  /*  const { callEnded, getCall, callAccepted, mySocketId, videoScreen } =
    useSelector((store) => store.videos.callData); */

  const [stream, setStream] = useState();
  const enableMedia = () => {
    //inComingVideo.current.srcObject = stream;
    myVideo.current.srcObject = stream;
  };
  const callUser = () => {
    enableMedia();
    dispatch(reduxShowVideoTrue());
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    peer.on("signal", (data) => {
      callAUserSocket({
        userToCall: chattedUser._id,
        signal: data,
        from: mySocketId,
        name: loggedUser.name,
        picture: loggedUser.picture,
      });
    });
    peer.on("stream", (stream) => {
      inComingVideo.current.srcObject = stream;
    });

    socket.on("answer call user", (signal) => {
      peer.signal(signal);
      dispatch(reduxAcceptVideoCall());
      dispatch(reduxShowVideoTrue());
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    enableMedia();
    dispatch(reduxAcceptVideoCall());
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      answerCallUserSocket({
        signal: data,
        to: callingUser?.from,
      });
    });
    peer.on("stream", (currentStream) => {
      inComingVideo.current.srcObject = currentStream;
    });
    peer.signal(callingUser?.signal);
    connectionRef.current = peer;
  };

  const setUpMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
      })
      .catch((e) => {
        console.log(e);
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
      if (error.response.data.message === "jwt expired") {
        dispatch(reduxMakeTokenExpired());
      } else {
        toast.error(error.response.data.message);
      }
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
      <Calls
        myVideo={myVideo}
        inComingVideo={inComingVideo}
        stream={stream}
        answerCall={answerCall}
      />
    </>
  );
};

export default Home;
