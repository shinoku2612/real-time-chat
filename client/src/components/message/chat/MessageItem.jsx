import { forwardRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getConversationList } from "../../../store/selectors";

const MessageItem = ({ isOwn, senderId, message, timeAt }, ref) => {
  const { id: conversationId } = useParams();
  const conversationList = useSelector(getConversationList);

  const avatar = useMemo(() => {
    return conversationList
      .find((con) => con._id === conversationId)
      ?.members?.find((m) => m.memberId === senderId)?.avatar;
  }, [conversationList, senderId, conversationId]);

  return (
    <li
      ref={ref}
      data-scroll
      className={`chat-item ${isOwn ? "own" : "not-own"}`}
    >
      <img
        className="w-6 h-6 rounded-full object-center object-cover"
        src={avatar}
        alt="own-avatar"
      />
      <div className="w-full">
        <span className="inline-block mb-1 h-max break-all px-2 py-1 ">
          {message}
        </span>
        <p className="text-[14px] text-slate-600">{timeAt}</p>
      </div>
    </li>
  );
};

export default forwardRef(MessageItem);
