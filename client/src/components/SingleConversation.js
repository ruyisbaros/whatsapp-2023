import React, { useEffect, useState } from "react";
import { dateHandler } from "../utils/momentHandler";
import axios from "../axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { reduxSetActiveConversation } from "../redux/chatSlice";

const SingleConversation = ({ convo }) => {
  const dispatch = useDispatch();
  const open_create_conversation = async () => {
    try {
      const { data } = await axios.post("conversation/open_create", {
        receiver_id: convo?.users[1],
      });
      console.log(data);
      dispatch(reduxSetActiveConversation(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <li
      className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px] rounded-lg"
      onClick={open_create_conversation}
    >
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/* Left side (photo latest message etc) */}
        <div className="flex items-center gap-x-3">
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={convo.picture}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full flex flex-col">
            <h1 className="font-bold capitalize flex items-center gap-x-2">
              {convo.name}
            </h1>
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1">
                  <p>
                    {convo.latestMessage
                      ? convo.latestMessage.message.length > 26
                        ? convo.latestMessage.message.slice(0, 26) + "..."
                        : convo.latestMessage.message
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex flex-col items-end gap-y-4 text-xs">
          <span className="dark:text-dark_text_2">
            {convo.latestMessage
              ? dateHandler(convo.latestMessage.createdAt)
              : ""}
          </span>
        </div>
      </div>
      {/* Bottom line */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
};

export default SingleConversation;
