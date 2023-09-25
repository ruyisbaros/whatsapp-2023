import React, { useEffect, useState } from "react";
import Ringing from "./Ringing";
import Header from "./Header";
import CallAreaInfo from "./CallAreaInfo";
import CallAreaActions from "./CallAreaActions";
import { useSelector } from "react-redux";

const Calls = ({ inComingVideo, myVideo, stream }) => {
  const [showCallActions, setShowCallActions] = useState(false);
  const { callEnded, getCall, callAccepted, mySocketId, videoScreen } =
    useSelector((store) => store.videos.callData);
  const { chattedUser } = useSelector((store) => store.messages);

  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 
  -translate-x-1/2 -translate-y-1/2 z30 w-[360px] h-[550px] rounded-2xl overflow-hidden callBg shadow-lg ${
    !videoScreen && !callAccepted ? "hidden" : ""
  }`}
        onMouseOver={() => setShowCallActions(true)}
        onMouseLeave={() => setShowCallActions(false)}
      >
        <div>
          <div>
            <Header />
            <CallAreaInfo name={chattedUser?.name} />
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
      </div>
      {getCall && !callAccepted && <Ringing />}
    </>
  );
};

export default Calls;
