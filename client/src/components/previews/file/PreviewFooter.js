import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "./../../../assets/svg/Send";

const PreviewFooter = ({
  message,
  setMessage,
  setActiveIndex,
  activeIndex,
}) => {
  const dispatch = useDispatch();
  const { files } = useSelector((store) => store.messages);
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-[40px] max-w-[60%] dark:bg-dark_hover_1 rounded-lg">
        <input
          className="w-full h-full bg-transparent border-none outline-none rounded-lg pl-2 dark:text-dark_text_1"
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      {/* send/review images/add more file */}
      <div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2">
        <span></span>
        <div className="flex gap-x-2 mt-2">
          {files.length > 0 &&
            files.map((file, i) => (
              <div
                key={i}
                className={`w-14 h-14 border dark:border-white rounded-md overflow-hidden cursor-pointer ${
                  activeIndex === i
                    ? "border-[3px] p-[1px] !border-green_1 transition-all duration-[0.3s]"
                    : ""
                }`}
                onClick={() => setActiveIndex(i)}
              >
                {file.type === "IMAGE" ? (
                  <img
                    src={file.data}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={`/file/${file.type}.png`}
                    alt=""
                    className="w-8 h-10 mt-1.5 ml-2.5 object-cover"
                  />
                )}
              </div>
            ))}
          <div>Add</div>
        </div>
        {/* <span></span> */}
        <div
          className="bg-green_1 w-14 h-14 mt-2 rounded-full flex items-center justify-center
        cursor-pointer"
        >
          <SendIcon className="dark:fill-white" />
        </div>
      </div>
    </div>
  );
};

export default PreviewFooter;
