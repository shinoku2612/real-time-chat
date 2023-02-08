import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import NotificationItem from "./NotificationItem";

const NotificationList = ({ isShow, notifications }) => {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          id="notification-panel"
          className="z-50 absolute top-[150%] right-[-180%] bg-white shadow-lg w-auto h-max p-1.5 rounded-md sm:p-1"
          initial={{ opacity: 0, scale: 0, originX: "80%", originY: "0" }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <ul className="max-w-[300px] w-max h-max  gap-y-1 flex flex-col">
            {notifications?.length === 0 && (
              <span className="inline-block sm:p-1 font-[500]">
                Don't have any notify
              </span>
            )}
            {notifications?.map((notification) => {
              return (
                <NotificationItem
                  key={notification._id}
                  avatar={notification.senderAvatar}
                  name={notification.senderName}
                  message={notification.notify}
                  isRead={notification.isResponse}
                  friendId={notification.senderId}
                  notificationId={notification._id}
                />
              );
            })}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationList;
