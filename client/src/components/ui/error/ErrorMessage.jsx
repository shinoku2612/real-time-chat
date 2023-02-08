import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ErrorMessage = ({ message, isShow }) => {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.span
          initial={{ y: -10, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.5 }}
          exit={{ y: -10, opacity: 0 }}
          className="py-1 text-[14px] text-rose-600 font-[500] tracking-wider pl-1 block sm:text-[12px]"
        >
          {message}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
