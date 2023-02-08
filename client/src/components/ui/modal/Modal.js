import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ children, isShow }) => {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={{ y: "-200vh", x: "-50%" }}
          whileInView={{ y: "-50%", x: "-50%" }}
          animate={{ y: "-40%" }}
          exit={{ y: "-150vh" }}
          transition={{ stiffness: 200, damping: 15, type: "spring" }}
          className="fixed top-1/2 left-1/2 w-1/2 sm:w-[90%] sm:mx-auto lg:w-[30%] xl:w-[30%] z-[100]"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
