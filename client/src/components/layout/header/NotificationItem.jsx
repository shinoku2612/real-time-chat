import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { UilTimes } from "@iconscout/react-unicons";
import {
  updateNotification,
  removeNotification,
} from "../../../store/notification-slice";
import { Link } from "react-router-dom";

const NotificationItem = ({
  avatar,
  name,
  message,
  isRead,
  friendId,
  notificationId,
}) => {
  const dispatch = useDispatch();

  function updateNotificationHandler(event) {
    event.stopPropagation();
    event.preventDefault();
    dispatch(updateNotification(notificationId));
  }

  function removeNotificationHandler(event) {
    event.stopPropagation();
    event.preventDefault();
    dispatch(removeNotification(notificationId));
  }

  return (
    <li onClick={updateNotificationHandler}>
      <Link
        to={`/wall/${friendId}`}
        className={`hover:bg-blue-400 hover:text-white duration-300 cursor-pointer w-full h-max rounded-md p-1 object-cover object-center flex items-start gap-x-2 relative ${
          isRead ? "bg-white" : "bg-gray-100"
        }`}
      >
        <img
          src={avatar}
          alt="avatar-notify"
          className="w-8 h-8 rounded-full object-center object-cover border-solid border-2 border-white sm:w-6 sm:h-6"
        />
        <div className="flex flex-col w-full leading-tight self-center">
          <span className="text-[14px] font-[500] sm:text-[12px]">{name}</span>
          <span className="text-[13px] ellipsis sm:text-[11px]">{message}</span>
        </div>
        <motion.div
          whileHover={{
            transition: { duration: 0.5 },
            rotate: "180deg",
          }}
          onClick={removeNotificationHandler}
          className="self-center bg-white rounded-full"
        >
          <UilTimes color="salmon" />
        </motion.div>
      </Link>
    </li>
  );
};

export default NotificationItem;
