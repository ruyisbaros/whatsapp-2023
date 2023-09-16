import React from "react";
import {
  CameraIcon,
  ContactIcon,
  PhotoIcon,
  PollIcon,
  StickerIcon,
} from "../../assets/svg";
import DocumentIcon from "./../../assets/svg/Document";

const AttachmentMenu = () => {
  return (
    <ul className="absolute openEmojiAnimation bottom-14">
      <li>
        <button type="button" className="rounded-full">
          <PollIcon />
        </button>
      </li>
      <li>
        <button type="button" className="bg-[#0eabf4] rounded-full">
          <ContactIcon />
        </button>
      </li>
      <li>
        <button type="button" className="bg-[#5f66cd] rounded-full">
          <DocumentIcon />
        </button>
      </li>
      <li>
        <button type="button" className="bg-[#d3396d] rounded-full">
          <CameraIcon />
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full">
          <StickerIcon />
        </button>
      </li>
      <li>
        <button type="button" className=" bg-[#bf59cf] rounded-full">
          <PhotoIcon />
        </button>
      </li>
    </ul>
  );
};

export default AttachmentMenu;
