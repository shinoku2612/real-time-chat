import React from "react";
import { motion } from "framer-motion";

const FriendState = ({ icon, title, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="bg-white hover:opacity-90 duration-300 rounded-md px-2 py-[8px] cursor-pointer text-slate-600 flex items-center text-[14px] font-[500] gap-x-2 sm:text-[7px] sm:gap-x-1 sm:px-1 sm:py-0.5 sm:rounded-sm sm:w-full"
    >
      {icon}
      {title}
    </motion.div>
  );
};

export default FriendState;
