import React from "react";
import { commonStyle } from "../../pages/Message";

const PseudoChat = () => {
  return (
    <div
      className={`basis-3/4 ${commonStyle} bg-transparent relative mt-[-6px] items-center flex justify-center text-center sm:basis-full`}
    >
      <span className="font-[800] text-white drop-shadow-md text-3xl">
        Connect to every one!
      </span>
    </div>
  );
};

export default PseudoChat;
