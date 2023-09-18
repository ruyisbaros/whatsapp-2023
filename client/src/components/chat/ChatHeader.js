import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchLargeIcon from "./../../assets/svg/SearchLarge";
import DotsIcon from "../../assets/svg/Dots";

const ChatHeader = () => {
  const { activeConversation, chattedUser } = useSelector(
    (store) => store.messages
  );
  const { loggedUser, onLineUsers } = useSelector((store) => store.currentUser);

  const [ME, setME] = useState("");
  const [YOU, setYOU] = useState("");

  const findMeAndYou = useCallback(() => {
    const me = activeConversation.users.find(
      (usr) => usr._id === loggedUser.id
    );
    setME(me);
    const you = activeConversation.users.find(
      (usr) => usr._id !== loggedUser.id
    );
    setYOU(you);
  }, [loggedUser, activeConversation]);
  useEffect(() => {
    findMeAndYou();
  }, [findMeAndYou]);
  return (
    <div className="h-[59px] dark:bg-dark_bg_2 p16 py-3">
      <div className="w-full h-full flex justify-between items-center">
        {/* Left site foto */}
        <div className="flex items-center gap-x-4">
          <button className="btn">
            <img
              src={YOU.picture}
              alt="active user"
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          <div className="flex flex-col">
            <h1 className="dark:text-white capitalize text-sm font-bold">
              {YOU.name}
            </h1>
            <span className="text-xs dark:text-dark_svg_2">
              {onLineUsers.find((usr) => usr.id === chattedUser._id)
                ? "online"
                : "Last online " + chattedUser.lastSeen}
            </span>
          </div>
        </div>
        {/* Right side icons */}
        <ul className="flex items-center gap-x-2.5">
          <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatHeader;
