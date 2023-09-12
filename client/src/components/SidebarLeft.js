import React, { useState } from "react";
import SideBarHeader from "./SideBarHeader";
import Notifications from "./Notifications";
import SearchBar from "./SearchBar";

const SidebarLeft = () => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="w-[40%] h-full min-h-screen select-none">
      <SideBarHeader />
      <Notifications />
      <SearchBar searchResults={searchResults.length} />
    </div>
  );
};

export default SidebarLeft;
