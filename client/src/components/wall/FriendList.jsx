import React from "react";
import FriendItem from "./FriendItem";

const FriendList = ({ list }) => {
  const isEmpty = !list || list.length === 0;
  return (
    <ul className="w-full h-max max-h-[50vh] overflow-auto grid gap-2 grid-cols-2 items-start justify-center p-2 sm:grid-cols-1">
      {isEmpty && (
        <span className="font-[500] text-center w-full block text-slate-400 col-span-2 sm:text-[14px]">
          No friends found!
        </span>
      )}
      {!isEmpty &&
        list.map((friend) => {
          return (
            <FriendItem
              key={friend._id}
              avatar={friend.avatar}
              name={`${friend.firstName} ${friend.lastName}`}
              id={friend._id}
            />
          );
        })}
    </ul>
  );
};

export default FriendList;
