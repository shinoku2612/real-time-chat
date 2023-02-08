import React from "react";
import { motion } from "framer-motion";

const MyButton = ({
  title,
  bgColor,
  textColor,
  width,
  onClick,
  type,
  disabled,
  children,
}) => {
  return (
    <motion.button
      disabled={disabled}
      className={`${bgColor} ${textColor} ${width} rounded-[25px] px-3 py-2 text-[16px] font-[500] tracking-wide disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-white flex items-center justify-center sm:text-[14px]`}
      whileHover={{
        scale: 1.1,
        opacity: 0.8,
      }}
      whileTap={
        !disabled && {
          scale: 1.1,
        }
      }
      onClick={onClick}
      type={type ?? "submit"}
    >
      {title}
      {children}
    </motion.button>
  );
};

export default MyButton;
