import { useRef, useEffect, memo, useState } from "react";
import { useParams } from "react-router-dom";
import MessageItem from "./MessageItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  getMessageList,
  hasMore as hasMoreMsg,
  hasGetMore,
} from "../../../store/selectors";
import { formatTime } from "../../../utils/helper";
import getSocketIO, {
  getMessage,
  removeGetMessage,
} from "../../../services/socketIO";
import {
  addMessage,
  getMessages,
  hasMore as setHasMore,
  hasGetMore as setHasGetMore,
} from "../../../store/message-slice";

import {
  setLastMsg,
  updateStateConversation,
} from "../../../store/conversation-slice";
import CircleLoading from "../../ui/loading/CircleLoading";
import { AnimatePresence, motion } from "framer-motion";
import { CircularProgress } from "@mui/material";

const Messages = ({ isPending, onHasLoadingMore, isLoadingMore }) => {
  const { id: userId } = useSelector(getUser);
  const { id: visitedConversationId } = useParams();
  const messages = useSelector(getMessageList);
  const isGetMore = useSelector(hasGetMore);
  const hasMore = useSelector(hasMoreMsg);
  const dispatch = useDispatch();

  const scrollRef = useRef();
  const observer = useRef();

  useEffect(() => {
    if (
      isLoadingMore ||
      scrollRef.current?.scrollHeight <= scrollRef.current?.clientHeight
    )
      return;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onHasLoadingMore(true);
          dispatch(setHasGetMore(true));
          dispatch(
            getMessages(visitedConversationId, null, messages.length, 2)
          );
        }
      },
      {
        root: document.querySelector("[data-scroll-parent]"),
      }
    );
    if (observer.current && hasMore)
      intersectionObserver.observe(observer.current);

    return () => intersectionObserver.disconnect();
  }, [hasMore, isLoadingMore, messages]);

  useEffect(() => {
    if (visitedConversationId) {
      dispatch(setHasMore(true));
      dispatch(getMessages(visitedConversationId, null, 0, 10));
    }
    dispatch(setHasGetMore(false));
  }, [visitedConversationId]);

  useEffect(() => {
    const socket = getSocketIO();
    if (socket?.connected) {
      const getMessageHandler = ({ senderId, text, conversationId }) => {
        const date = new Date();
        const isVisited = conversationId === visitedConversationId;
        dispatch(
          setLastMsg({
            conversationId,
            lastMsg: { senderId, text, createdAt: date.toISOString() },
          })
        );
        isVisited
          ? dispatch(
              addMessage({
                _id: date.getTime(),
                senderId,
                text,
                conversationId,
                createdAt: date.toISOString(),
              })
            )
          : dispatch(
              updateStateConversation({ conversationId, isUnSeen: true })
            );
      };

      getMessage(getMessageHandler, socket);
      return () => removeGetMessage(getMessageHandler, socket);
    }
  }, [getSocketIO()?.connected, visitedConversationId]);

  useEffect(() => {
    scrollRef.current &&
      (scrollRef.current.scrollTop = isGetMore
        ? 200
        : scrollRef.current?.scrollHeight);
  }, [messages, isGetMore]);

  return (
    <>
      <AnimatePresence>
        {isPending && !isLoadingMore && <CircleLoading height="h-[79.5%]" />}
      </AnimatePresence>
      {!isPending && (
        <ul
          data-scroll-parent
          ref={scrollRef}
          className="h-full w-full flex flex-col gap-y-5 p-2 overflow-auto bg-gradient-b from-transparent to-white z-9 shadow-[0_0_10px_-5px_#0000004a]"
        >
          <>
            <AnimatePresence>
              {isLoadingMore && (
                <motion.div
                  className="w-full text-center"
                  initial={{ opacity: 0, y: -10 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  animate={{ opacity: 1, y: 10 }}
                >
                  <CircularProgress />
                </motion.div>
              )}
            </AnimatePresence>
            {messages?.length === 0 && (
              <p className="text-center text-[16px] font-[500] text-slate-600">
                Let's chat here!
              </p>
            )}
            {messages?.map((message, index) => {
              if (index === 0) {
                return (
                  <MessageItem
                    ref={observer}
                    key={message._id}
                    isOwn={message.senderId === userId}
                    senderId={message.senderId}
                    message={message.text}
                    timeAt={formatTime(message.createdAt)}
                  />
                );
              }
              return (
                <MessageItem
                  key={message._id}
                  isOwn={message.senderId === userId}
                  senderId={message.senderId}
                  message={message.text}
                  timeAt={formatTime(message.createdAt)}
                />
              );
            })}
          </>
        </ul>
      )}
    </>
  );
};

export default memo(Messages);
