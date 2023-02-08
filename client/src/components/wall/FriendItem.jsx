import React from "react";
import { Link } from "react-router-dom";

const FriendItem = ({ avatar, name, id }) => {
  return (
    <li className="h-full">
      <Link
        className="text-[16px] flex items-center gap-x-2 w-full h-full bg-white shadow-lg p-2 rounded-md item-hovered md:block md:text-center"
        to={`/wall/${id}`}
      >
        <img
          src={avatar}
          alt="avatar-friend"
          className="w-10 h-10 sm:w-5 sm:h-5 rounded-full border-2 border-solid border-white object-center object-cover md:text-center md:mx-auto flex-none"
        />
        <div className="w-full overflow-hidden md:mt-2">
          <h3 className="w-full font-[600] text-[16px] sm:text-[9px] sm:font-[500]">
            {name}
          </h3>
        </div>
      </Link>
    </li>
  );
};

export default FriendItem;
