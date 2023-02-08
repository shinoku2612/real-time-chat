import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  UilTimesSquare,
  UilCheckCircle,
  UilExclamationTriangle,
} from "@iconscout/react-unicons";

const Toast = ({ type, message, onRemove, autoClose = true }) => {
  useEffect(() => {
    if (autoClose) {
      const idTimer = setTimeout(() => {
        onRemove();
      }, 3500);
      return () => clearTimeout(idTimer);
    }
  }, []);

  const typeToast =
    type === "error"
      ? {
          bg: "bg-red-500",
          icon: (
            <UilExclamationTriangle
              color="white"
              size="22px"
              className="flex-none"
            />
          ),
        }
      : {
          bg: "bg-green-500",
          icon: (
            <UilCheckCircle color="white" size="22px" className="flex-none" />
          ),
        };
  return (
    <motion.div
      initial={{
        x: 800,
        top: 50,
      }}
      transition={{ stiffness: 50, type: "spring" }}
      animate={{ x: -10 }}
      className={`toast ${typeToast.bg}`}
    >
      {typeToast.icon}
      <span className="text-[15px] text-white sm:text-[10px]">{message}</span>
      <div className="cursor-pointer" onClick={onRemove}>
        <UilTimesSquare color="white" size="22px" />
      </div>
      <motion.div
        initial={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "3px",
        }}
        animate={{ width: "0%" }}
        transition={{ duration: 3, delay: 0.5 }}
        className="bg-sky-500"
      ></motion.div>
    </motion.div>
  );
};

export default Toast;
