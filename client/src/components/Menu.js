import React from "react";
import { useDispatch } from "react-redux";
import { reduxLogout } from "../redux/currentUserSlice";
import { toast } from "react-toastify";
import axios from "../axios";
const Menu = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");
      dispatch(reduxLogout());
      window.localStorage.removeItem("registeredUser");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="absolute right-0 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52">
      <ul>
        <li className="list-none py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>New group</span>
        </li>
        <li className="list-none py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>New community</span>
        </li>
        <li className="list-none py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Starred messages</span>
        </li>
        <li className="list-none py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Settings</span>
        </li>
        <li
          className="list-none py-3 pl-5 cursor-pointer hover:bg-dark_bg_3"
          onClick={handleLogout}
        >
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
