import React from "react";
import { useSelector } from "react-redux";
import CommunityIcon from "./../assets/svg/Community";
import StoryIcon from "./../assets/svg/Story";
import ChatIcon from "./../assets/svg/Chat";
import DotsIcon from "./../assets/svg/Dots";

const SideBarHeader = () => {
  const { loggedUser } = useSelector((store) => store.currentUser);
  return (
    <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p16">
      <div className="w-full flex items-center justify-between ">
        <button className="btn">
          <img
            className="rounded-full w-full h-full object-cover"
            src={loggedUser?.picture}
            alt="user profile"
          />
        </button>
        <ul className="flex items-center gap-x-2 ">
          <li>
            <button className="btn">
              <CommunityIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <StoryIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <ChatIcon className="dark:fill-dark_svg_1" />
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

export default SideBarHeader;
