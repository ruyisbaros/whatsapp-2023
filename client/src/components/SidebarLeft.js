import React, { useState } from "react";
import SideBarHeader from "./SideBarHeader";
import Notifications from "./Notifications";
import SearchBar from "./SearchBar";
import Conversations from "./Conversations";
import SearchResults from "./SearchResults";
import { useSelector } from "react-redux";

const SidebarLeft = () => {
  const [searchResults, setSearchResults] = useState([]);

  console.log(searchResults);
  return (
    <div className="w-[40%] h-full min-h-screen select-none">
      <SideBarHeader />
      <Notifications />
      <SearchBar
        searchResults={searchResults.length}
        setSearchResults={setSearchResults}
      />
      {searchResults.length > 0 ? (
        <SearchResults searchResults={searchResults} />
      ) : (
        <Conversations />
      )}
    </div>
  );
};

export default SidebarLeft;
