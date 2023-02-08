import { useMemo, memo, useEffect, useRef, useState } from "react";
import getSocketIO, {
  sendAddFriend as sendAddFriendToSocket,
} from "../../services/socketIO";
import useUI from "../../hooks/useUI";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  UilUserExclamation,
  UilUserCheck,
  UilUserPlus,
  UilUserMinus,
  UilUserTimes,
  UilCameraPlus,
  UilCheck,
  UilTimes,
} from "@iconscout/react-unicons";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import FriendState from "./FriendState";
import {
  getCreatedNotifiId,
  getFriendStatus,
  getStatus,
  getUser,
} from "../../store/selectors";
import {
  updateAvatar,
  resetStatus as userResetStatus,
  updateCoverPicture,
} from "../../store/authen-slice";
import {
  sendAddFriend,
  responseAddFriend,
  resetStatus,
  unfriend,
} from "../../store/friend-slice";
import withToast from "../../hoc/withToast";
import { convertImageToBase64 } from "../../utils/helper";

const WallAvatar = withToast(
  ({
    fullName,
    avatar,
    isOwned,
    isFriend,
    isPending,
    isResponse,
    coverPicture,
    toast,
  }) => {
    const dispatch = useDispatch();
    const param = useParams();
    const status = useSelector(getFriendStatus);
    const userStatus = useSelector(getStatus);
    const userInfor = useSelector(getUser);

    const { sizeWindow } = useUI();

    const [isUpdateAvatar, setIsUpdateAvatar] = useState(false);
    const [bgUrl, setBgUrl] = useState(null);
    const [bgSrc, setBgSrc] = useState(null);

    const createdNotifiId = useSelector(getCreatedNotifiId);

    const avatarRef = useRef();

    const updateAnimate = {
      exit: { x: -10, opacity: 0 },
      initial: { x: -10, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: 0.1 },
      whileHover: { opacity: 0.9 },
      whileTap: { scale: 1.2 },
    };
    const errorType = { color: "salmon" };
    const warningType = { color: "#ffb100cf" };
    const safeType = { color: "#50f350" };

    const sizeIcon = useMemo(
      () => (sizeWindow === "sm" ? "15px" : "22px"),
      [sizeWindow]
    );

    useEffect(() => {
      if (status === "send-add-friend/success") {
        toast.addToast({ message: "Send request successfully!" });
        dispatch(resetStatus());
        const socket = getSocketIO();
        socket?.connected &&
          sendAddFriendToSocket(
            {
              _id: createdNotifiId,
              senderId: userInfor.id,
              senderName: `${userInfor.firstName} ${userInfor.lastName}`,
              senderAvatar: userInfor.avatar,
              receiverId: param.id,
              notify: "Make friend, happy together!",
              isResponse: false,
            },
            socket
          );
      } else if (status === "send-add-friend/failed") {
        toast.addToast({
          message: "Send request failed, try again!",
          type: "error",
        });
        dispatch(resetStatus());
      } else if (status === "unfriend/success") {
        toast.addToast({
          message: "Unfriend successfully!",
        });
        dispatch(resetStatus());
      } else if (status === "unfriend/failed") {
        toast.addToast({
          message: "Unfriend failed, something went wrong!",
          type: "error",
        });
        dispatch(resetStatus());
      }
    }, [status, dispatch, toast]);

    useEffect(() => {
      if (userStatus === "update-avatar/success") {
        toast.addToast({ message: "Change avatar successfully!" });
        dispatch(userResetStatus());
      } else if (userStatus === "update-avatar/failed") {
        toast.addToast({
          message: "Change avatar failed, something went wrong!",
          type: "error",
        });
        dispatch(userResetStatus());
      } else if (userStatus === "update-background/success") {
        toast.addToast({ message: "Change background successfully!" });
        dispatch(userResetStatus());
      } else if (userStatus === "update-background/failed") {
        toast.addToast({
          message: "Change background failed, something went wrong!",
          type: "error",
        });
        dispatch(userResetStatus());
      }
    }, [userStatus, dispatch, toast]);

    function sendAddFriendHandler() {
      dispatch(sendAddFriend(param.id));
    }

    function responseAddFriendHandler(isAccepted) {
      dispatch(
        responseAddFriend({ receiverId: param.id, accepted: isAccepted })
      );
    }

    function unfriendHandler() {
      dispatch(unfriend(param.id));
    }

    function clickFileInputHandler(e) {
      // handle not change file when choose one file twice
      e.target.value = "";
    }

    useEffect(() => {
      if (bgSrc) {
        setBgUrl(URL.createObjectURL(bgSrc));
        return () => URL.revokeObjectURL(bgSrc);
      }
    }, [bgSrc]);

    function changeAvatarHandler(e) {
      e.target.files?.length > 0 &&
        convertImageToBase64(e.target.files[0], (reader) => {
          const base64Code = reader.target.result;
          avatarRef.current.src = base64Code;
          setIsUpdateAvatar(true);
        });
    }

    function changeBackgroundHandler(e) {
      e.target.files[0] && setBgSrc(e.target.files[0]);
    }

    function cancelUpdateBackgroundHandler() {
      setBgUrl(coverPicture);
      setBgSrc(null);
    }

    function updateBackgroundHandler() {
      convertImageToBase64(bgSrc, (reader) => {
        const base64Code = reader.target.result;
        dispatch(updateCoverPicture(base64Code));
      });
      setBgSrc(null);
    }

    function cancelUpdateAvatarHandler() {
      avatarRef.current.src = avatar;
      setIsUpdateAvatar(false);
    }

    function updateAvatarHandler() {
      dispatch(updateAvatar(avatarRef.current.src));
      setIsUpdateAvatar(false);
    }

    return (
      <section
        className={`w-5/6 relative rounded-b-lg pt-[25%] `}
        style={{
          backgroundImage: `url('${bgUrl ?? coverPicture}')`,
          backgroundAttachment: sizeWindow === "lg" ? "fixed" : "scroll",
          backgroundPosition: sizeWindow === "lg" ? "center" : "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="bottom-0 absolute-x-center translate-y-[50%] w-[120px] sm:w-[80px] h-max">
          <div className="  relative ">
            <img
              ref={avatarRef}
              src={avatar}
              alt="avatar"
              className="w-[120px] h-[120px] sm:w-[80px] sm:h-[80px] duration-300 rounded-full object-cover object-center shadow-[0_0_0_5px_#ffffff]"
            />
            {isOwned && (
              <motion.div
                whileInView={{
                  translateX: isUpdateAvatar ? "60%" : "0%",
                  transition: { duration: 0.3 },
                }}
                className="absolute bottom-0 right-0  text-slate-600 bg-white shadow-md  flex justify-center items-center  rounded-full"
              >
                <label
                  htmlFor="change-avatar"
                  className="cursor-pointer p-[8px] sm:p-[5px]"
                >
                  <UilCameraPlus size={sizeIcon} className="flex" />
                </label>
                <input
                  onClick={clickFileInputHandler}
                  onChange={changeAvatarHandler}
                  accept="image/*"
                  type="file"
                  id="change-avatar"
                  className="hidden outline-none border-none"
                />{" "}
                <AnimatePresence>
                  {isUpdateAvatar && (
                    <motion.div
                      className="p-[8px] cursor-pointer"
                      {...updateAnimate}
                      onClick={updateAvatarHandler}
                    >
                      <UilCheck size={sizeIcon} color="lightgreen" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {isUpdateAvatar && (
                    <motion.div
                      onClick={cancelUpdateAvatarHandler}
                      className="p-[8px] cursor-pointer"
                      {...updateAnimate}
                    >
                      <UilTimes size={sizeIcon} color="lightcoral" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
        <div className="absolute right-2 bottom-2 sm:right-1 sm:bottom-1 flex items-center gap-x-2 sm:flex-col sm:gap-y-1 sm:items-start">
          {isOwned && (
            <div className="bg-white flex cursor-pointer items-center w-max overflow-hidden px-2 rounded-md sm:rounded-sm py-1.5 sm:px-1 sm:py-0.5">
              <label
                htmlFor="change-bg"
                className="text-slate-600 flex items-center cursor-pointer text-[14px] font-bold  gap-x-1.5"
              >
                <motion.div {...updateAnimate}>
                  <CameraAltOutlinedIcon sx={{ fontSize: sizeIcon }} />
                </motion.div>
              </label>
              <AnimatePresence>
                {bgSrc && (
                  <motion.div
                    onClick={updateBackgroundHandler}
                    className="px-1"
                    {...updateAnimate}
                  >
                    <UilCheck color="lightgreen" size={sizeIcon} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {bgSrc && (
                  <motion.div
                    onClick={cancelUpdateBackgroundHandler}
                    {...updateAnimate}
                  >
                    <UilTimes color="lightcoral" size={sizeIcon} />
                  </motion.div>
                )}
              </AnimatePresence>
              <input
                onClick={clickFileInputHandler}
                onChange={changeBackgroundHandler}
                accept="image/*"
                type="file"
                id="change-bg"
                className="hidden outline-none border-none"
              />
            </div>
          )}
          {!isOwned && !isFriend && !isPending && !isResponse && (
            <div onClick={sendAddFriendHandler}>
              <FriendState
                icon={
                  <UilUserPlus style={{ color: "#6fdeff" }} size={sizeIcon} />
                }
                title="Add friend"
              />
            </div>
          )}
          {isPending && !isFriend && (
            <FriendState
              icon={<UilUserExclamation style={warningType} size={sizeIcon} />}
              title="Waitting"
            />
          )}
          {isFriend && !isResponse && (
            <FriendState
              onClick={unfriendHandler}
              icon={<UilUserMinus style={errorType} size={sizeIcon} />}
              title="Unfriend"
            />
          )}
          {isResponse && (
            <>
              <FriendState
                onClick={() => responseAddFriendHandler(true)}
                icon={<UilUserCheck style={safeType} size={sizeIcon} />}
                title="Accept"
              />
              <FriendState
                onClick={() => responseAddFriendHandler(false)}
                icon={<UilUserTimes style={errorType} size={sizeIcon} />}
                title="Deny"
              />
            </>
          )}
        </div>
        <span className="text-[20px] sm:text-[16px] truncate max-w-1/2 w-full block text-slate-600 absolute-x-center bottom-[-100px] sm:bottom-[-80px] font-[500] text-center">
          {fullName}
        </span>
      </section>
    );
  }
);

export default memo(WallAvatar);
