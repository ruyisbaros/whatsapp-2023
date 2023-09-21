import React, { useEffect, useState } from "react";
import Ringing from "./Ringing";
import Header from "./Header";
import CallAreaInfo from "./CallAreaInfo";

const Calls = ({ call, setCall }) => {
  return (
    <div
      className={`fixed top-1/2 left-1/2 
  -translate-x-1/2 -translate-y-1/2 z-30 w-[360px] h-[550px] rounded-2xl overflow-hidden callBg shadow-lg`}
    >
      <div>
        <div>
          <Header />
          <CallAreaInfo name="ahmet" />
        </div>
      </div>
      {call.getCall && !call.callAccepted && (
        <Ringing call={call} setCall={setCall} />
      )}
    </div>
  );
};

export default Calls;
