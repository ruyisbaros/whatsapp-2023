import React, { useEffect, useState } from "react";
import Ringing from "./Ringing";
import Header from "./Header";
import CallAreaInfo from "./CallAreaInfo";
import CallAreaActions from "./CallAreaActions";
import { useSelector } from "react-redux";

const Calls = ({ inComingVideo, myVideo, stream }) => {
  const [showCallActions, setShowCallActions] = useState(false);
  const { videoWith, callEnded, getCall, callAccepted, videoWithSocketId } =
    useSelector((store) => store.videos);
  return (
    <div
      className={`fixed top-1/2 left-1/2 
  -translate-x-1/2 -translate-y-1/2 z30 w-[360px] h-[550px] rounded-2xl overflow-hidden callBg shadow-lg`}
      onMouseOver={() => setShowCallActions(true)}
      onMouseLeave={() => setShowCallActions(false)}
    >
      <div>
        <div>
          <Header />
          <CallAreaInfo name="ahmet" />
          {showCallActions && <CallAreaActions />}
        </div>
        {/* Show videos */}
        <div>
          {/* In coming video */}
          <div>
            <video
              ref={inComingVideo}
              playsInline
              muted
              autoPlay
              className="largeVideoCall"
            ></video>
          </div>
          {/* My video */}
          <div>
            <video
              ref={myVideo}
              playsInline
              muted
              autoPlay
              className={`SmallVideoCall ${
                showCallActions ? "moveVideoCall" : ""
              }`}
            ></video>
          </div>
        </div>
      </div>
      {getCall && !callAccepted && <Ringing />}
    </div>
  );
};

export default Calls;
