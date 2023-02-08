import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const ProcessBar = ({ isShow }) => {
  const [process, setProcess] = useState(0);

  useEffect(() => {
    if (!isShow) {
      setProcess(0);
    }
  }, [isShow]);

  useEffect(() => {
    const idTimer = setInterval(() => {
      setProcess((process) => (process < 100 ? process + 10 : process));
    }, 700);

    return () => clearInterval(idTimer);
  }, []);

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {isShow && (
            <motion.div
              initial={{ width: 0 }}
              transition={{ duration: 0.3 }}
              whileInView={{
                width: `${process}%`,
                height: "3px",
                backgroundColor: "#0ea5e9",
              }}
              exit={{ width: "100%", height: 0 }}
            ></motion.div>
          )}
        </AnimatePresence>,
        document.getElementById("process-bar")
      )}
    </>
  );
};

export default ProcessBar;
