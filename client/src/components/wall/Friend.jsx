import React from "react";
import FriendList from "./FriendList";

const Friend = ({ friendList }) => {
  return (
    <div className="w-full h-max sm:text-[16px]">
      <h6 className="w-full block border-b text-sm font-bold border-solid border-b-slate-900 sm:font-[600] sm:text-[16px]">
        Friends
      </h6>
      <FriendList list={friendList} />
    </div>
  );
};

export default Friend;
