import { useEffect, memo } from "react";
import Backdrop from "../ui/modal/Backdrop";
import useUI from "../../hooks/useUI";
import { useNavigate } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";
import ConversationList from "../message/friends/ConversationList";
import PseudoChat from "../message/chat/PseudoChat";
import { resetStatus } from "../../store/conversation-slice";
import { getConversationsStatus } from "../../store/selectors";
import withToast from "../../hoc/withToast";
import { useDispatch, useSelector } from "react-redux";

export const commonStyle =
  "rounded-md rounded-tl-none rounded-bl-none px-2 py-1 h-full";

const Message = ({ toast }) => {
  const { id: conversationId } = useParams();

  const status = useSelector(getConversationsStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { showConversationList, sizeWindow, onToggleConversationList } =
    useUI();

  useEffect(() => {
    if (status === "create-conversation/success") {
      toast.addToast({ message: "Add new group successfully!" });
    } else if (status === "create-conversation/failed") {
      toast.addToast({ type: "error", message: "Add new group failed!" });
    } else if (status === "delete-conversation/success") {
      toast.addToast({ message: "Delete convesation successfully!" });
      navigate("/message", { replace: true });
    } else if (status === "delete-conversation/failed") {
      toast.addToast({
        type: "error",
        message: "Delete convesation failed, something went wrong!",
      });
    } else if (status === "add-member/success") {
      toast.addToast({ message: "Add new members successfully!" });
    } else if (status === "add-member/failed") {
      toast.addToast({
        type: "error",
        message: "Add new members failed, something went wrong!",
      });
    }
    if (status.split("/")[1] !== "pending") {
      dispatch(resetStatus());
    }
  }, [status]);

  return (
    <>
      <Backdrop
        isShow={showConversationList && sizeWindow === "sm"}
        onClose={onToggleConversationList}
      />
      <div className="format-page-size flex h-[calc(100vh_-_90px)] relative">
        <div
          className={`sm:z-[99] w-[260px] lg:w-[350px] flex-none ${commonStyle} flex flex-col items-center gap-y-2 text-[14px] bg-white sm:shadow-lg pr-2 ${
            sizeWindow === "sm" ? "absolute left-[-350px]" : "static left-0"
          } duration-300 ${showConversationList ? "left-0" : "left-[-350px]"}`}
        >
          <ConversationList />
        </div>
        {conversationId ? <Outlet /> : <PseudoChat />}
      </div>
    </>
  );
};

export default withToast(memo(Message));
