import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import AvatarSettings from "./AvatarSettings";
import NotificationList from "./NotificationList";
import Animation from "../../../animation/Animation";
import { fallAnimate } from "../../../animation/models";
import Search from "../../ui/search/Search";
import { getNotifications, getUser } from "../../../store/selectors";
import { useSelector } from "react-redux";
import useSearch from "../../../hooks/useSearch";
import NotifyBubble from "../../ui/notification/NotifyBubble";

const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowNotification, setIsShowNotification] = useState(false);
  const notifications = useSelector(getNotifications);
  const navigate = useNavigate();

  const searchHandler = useSearch((value) =>
    navigate("/search", { state: value })
  );

  const focusHandler = () => navigate("/search");

  const { avatar } = useSelector(getUser);

  const isNotify = useMemo(
    () => notifications?.some((notification) => !notification.isResponse),
    [notifications]
  );

  useEffect(() => {
    function handlerEvent(event) {
      const avatarMenuContainer = document.getElementById("avatar-container");
      const notificationPanel = document.getElementById("notification-panel");
      const notificationContainer = document.getElementById(
        "notification-container"
      );

      avatarMenuContainer.contains(event.target)
        ? setIsShowMenu((prev) => !prev)
        : setIsShowMenu(false);

      notificationContainer.contains(event.target)
        ? notificationPanel?.contains(event.target)
          ? setIsShowNotification(true)
          : setIsShowNotification((prev) => !prev)
        : setIsShowNotification(false);
    }
    document.addEventListener("mouseup", handlerEvent);
    return () => document.removeEventListener("mouseup", handlerEvent);
  }, []);

  return (
    <header className="bg-white z-[10] w-[90%] xl:w-[1300px] px-auto mx-auto h-[70px] flex gap-x-5 items-center justify-between border-b border-solid border-slate-400 text-sm text-gray-600 fixed top-0 left-0 right-0">
      <div className="ml-auto flex  gap-x-2 relative w-5/12 sm:w-1/3">
        <Animation animationCreator={fallAnimate}>
          <div>Logo</div>
        </Animation>
        <span className="mx-auto sm:hidden">Enjoy your moment</span>
      </div>
      <div className="w-1/3 text-gray-200 sm:w-2/3">
        <Search
          onFocus={focusHandler}
          onSearch={searchHandler}
          bgColor="bg-gray-200"
          placeholder="Search friend..."
        />
      </div>
      <div className="w-1/4 mr-auto flex text-[14px] items-center gap-x-5 relative justify-end">
        {/* Notify section */}
        <div className="relative cursor-pointer" id="notification-container">
          <NotifyBubble
            top="top-[10px]"
            right="right-[0px]"
            isNotify={isNotify}
            color="bg-red-500"
          />
          <motion.div
            className="cursor-pointer"
            initial={{
              origin: "center center",
            }}
            whileTap={{
              transition: { duration: 0.3 },
              scale: 2,
            }}
          >
            <NotificationsOutlinedIcon sx={{ fontSize: 22 }} />
          </motion.div>
          <NotificationList
            isShow={isShowNotification}
            notifications={notifications}
          />
        </div>

        {/* Avatar section */}
        <Animation animationCreator={fallAnimate}>
          <div
            id="avatar-container"
            className="relative cursor-pointer w-7 h-7 rounded-full sm:w-6 sm:h-6"
          >
            <img
              className="w-full h-full object-cover object-center rounded-full shadow-[0_0_0_5px_#bae6fd]"
              src={avatar}
              alt="avatar"
            />
            <AvatarSettings isShowMenu={isShowMenu} />
          </div>
        </Animation>
      </div>
    </header>
  );
};

export default Header;
