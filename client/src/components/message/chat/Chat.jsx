import { useEffect, useMemo, memo, useState } from "react";
import Backdrop from "../../ui/modal/Backdrop";
import useUI from "../../../hooks/useUI";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetStatus } from "../../../store/message-slice";
import {
  getStatusMessage,
  getConversationList,
  getUser,
} from "../../../store/selectors";
import { commonStyle } from "../../pages/Message";
import Send from "./Send";
import Header from "./Header";
import Settings from "../settings/Settings";
import Messages from "./Messages";
import { motion, AnimatePresence } from "framer-motion";

const Chat = () => {
  const { id: conversationId } = useParams();
  const { id: userId } = useSelector(getUser);
  const conversationList = useSelector(getConversationList);
  const { onHideConversationList, onHideConverInfor } = useUI();
  const dispatch = useDispatch();
  const status = useSelector(getStatusMessage);
  const isPending = useMemo(() => status === "get-message/pending", [status]);
  const [isLoadingMore, setIsLoadingMore] = useState(true);

  const { isShowInfor, sizeWindow } = useUI();

  useEffect(() => {
    if (status === "get-message/success") {
      setIsLoadingMore(false);
      dispatch(resetStatus());
      onHideConversationList();
    }
  }, [status]);

  const conversationInfor = useMemo(() => {
    const conversation = conversationList.find(
      (con) => con._id === conversationId
    );
    return conversation?.isGroup
      ? {
          ...conversation,
          avatar: conversation?.members?.slice(0, 2).map((m) => m.avatar),
        }
      : conversation;
  }, [conversationId, conversationList]);

  const receiverId = useMemo(
    () =>
      !conversationInfor?.isGroup &&
      conversationInfor?.members.find((m) => m.memberId !== userId)?.memberId,
    [conversationInfor]
  );

  return (
    <>
      <div
        className={`w-full duration-500 ${commonStyle} bg-transparent relative mt-[-6px] sm:absolute flex flex-col`}
      >
        <Header
          avatar={conversationInfor?.avatar}
          name={conversationInfor?.title}
        />
        <Messages
          isLoadingMore={isLoadingMore}
          isPending={isPending}
          conversationAvatar={conversationInfor?.avatar}
          visitedConversationId={conversationId}
        />
        <AnimatePresence>
          {!isPending && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Send conversationId={conversationId} receiverId={receiverId} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Backdrop
        isShow={isShowInfor && sizeWindow === "sm"}
        onClose={onHideConverInfor}
      />
      <AnimatePresence>
        {isShowInfor && (
          <motion.div
            initial={{ x: sizeWindow === "sm" ? "-250px" : "250px" }}
            exit={{ x: sizeWindow === "sm" ? "-250px" : "250px" }}
            animate={{ x: "0" }}
            transition={{ duration: 0.3 }}
            className={`${commonStyle} sm:z-[99] flex flex-col w-[250px] gap-y-2 text-primary items-center mt-2 flex-none bg-white sm:shadow-lg sm:h-auto`}
          >
            <Settings
              friendId={receiverId}
              avatar={conversationInfor?.avatar}
              name={conversationInfor?.title}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Chat);
