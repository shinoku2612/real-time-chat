import { useState, useMemo, memo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../../store/selectors";
import { getOfflineTime } from "../../../utils/helper";
import { useSelector } from "react-redux";
import NotifyBubble from "../../ui/notification/NotifyBubble";
import GroupAvatar from "../GroupAvatar";

const ConversationItem = ({
  avatar,
  name,
  fromOnline,
  conversationId,
  lastMsg,
  isUnSeen,
  isGroup,
  members,
}) => {
  const { id: userId } = useSelector(getUser);
  const { id: visitedConversationId } = useParams();
  const isChoosing = useMemo(
    () => visitedConversationId === conversationId,
    [conversationId, visitedConversationId]
  );
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const idTimer = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 60_000);

    return () => clearInterval(idTimer);
  }, []);

  const twoEarlyAvatarMember = useMemo(
    () => isGroup && members.slice(0, 2).map((m) => m.avatar),
    [members, isGroup]
  );

  return (
    <li
      className={`h-max w-full bg-white px-3 py-2 rounded-md item-hovered text-slate-600 ${
        isChoosing ? "bg-slate-200" : ""
      } ${isUnSeen ? "bg-slate-100 font-bold" : ""} relative sm:px-2 sm:py-1`}
    >
      <Link to={`/message/${conversationId}`}>
        <NotifyBubble color="bg-blue-500" isNotify={isUnSeen} />
        <div className="flex gap-x-2 w-full relative">
          <div
            className={`relative  online ${!fromOnline ? "" : "off"} flex-none`}
          >
            {isGroup ? (
              <GroupAvatar
                img1={twoEarlyAvatarMember[0]}
                img2={twoEarlyAvatarMember[1]}
              />
            ) : (
              <img
                className="lg:h-8 lg:w-8 w-7 h-7 object-center object-cover rounded-full border-2 border-white border-solid"
                src={avatar}
                alt="avatar-chat"
              />
            )}
          </div>
          <div className="flex flex-col overflow-hidden justify-center sm:text-[12px]">
            <span className="lg:text-[15px] font-[500]">{name}</span>
            <p className="truncate inline-block mg:mb-auto">
              {lastMsg?.senderId === userId
                ? `You: ${lastMsg?.text}`
                : lastMsg?.text}
            </p>
          </div>
          <div
            className={`ml-auto flex flex-col justify-center items-end sm:text-[12px]`}
          >
            <span
              className={`${
                !fromOnline ? "text-green-500 font-[500]" : ""
              } whitespace-nowrap`}
            >
              {getOfflineTime(fromOnline) ?? "online"}
            </span>
            <span className="whitespace-nowrap relative w-full mt-auto">
              {getOfflineTime(new Date(lastMsg?.createdAt).getTime())}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default memo(ConversationItem);
