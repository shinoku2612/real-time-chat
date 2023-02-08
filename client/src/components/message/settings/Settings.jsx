import { useEffect, useMemo, useState } from "react";
import useUI from "../../../hooks/useUI";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversationList,
  getConversationsStatus,
  getUser,
  isGroup,
} from "../../../store/selectors";
import {
  UilInfoCircle,
  UilEllipsisV,
  UilUserPlus,
  UilTrashAlt,
} from "@iconscout/react-unicons";
import { Link, useParams } from "react-router-dom";
import MemberList from "./MemberList";
import GroupAvatar from "../GroupAvatar";
import { motion, AnimatePresence } from "framer-motion";
import { scaleAnimate } from "../../../animation/models";
import useAddMembers from "../../../hooks/useAddMembers";
import { MemberList as MemberListAdd } from "../friends/NewConversation";
import MyButton from "../../ui/button/MyButton";
import { CircularProgress } from "@mui/material";
import withToggleModal from "../../../hoc/withToggleModal";
import {
  addMember,
  deleteConversation,
} from "../../../store/conversation-slice";

const MenuItem = ({ icon, title, onClick }) => {
  return (
    <li
      className="flex items-center gap-x-2 item-hovered px-2 py-1 rounded-sm font-[500]"
      onClick={onClick}
    >
      {icon}
      <span>{title}</span>
    </li>
  );
};

const AddMemberDialog = ({ onClose }) => {
  const { choosyFriendList, onAddMember } = useAddMembers();
  const user = useSelector(getUser);
  const conversationList = useSelector(getConversationList);
  const { id: visitedConversationId } = useParams();
  const dispatch = useDispatch();
  const status = useSelector(getConversationsStatus);
  const visitedConversation = useMemo(
    () => conversationList.find((con) => con._id === visitedConversationId),
    [conversationList, visitedConversationId]
  );

  const friendListPossible = useMemo(() => {
    const visitedMemberListId = visitedConversation?.members.map(
      (m) => m.memberId
    );
    return user.friendList.filter(
      (friend) => !visitedMemberListId.includes(friend._id)
    );
  }, [visitedConversation, user.friendList]);

  function submitHandler(e) {
    e.preventDefault();

    dispatch(
      addMember({
        members: choosyFriendList,
        conversationId: visitedConversationId,
      })
    );
  }

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white shadow-md rounded-md px-2 py-4"
    >
      <p className="text-center text-[20px] font-[500] text-slate-600">
        Add members
      </p>
      {friendListPossible?.length === 0 && (
        <p className="text-center text-slate-600 text-[18px] p-2">
          All your friend is members!
        </p>
      )}
      <MemberListAdd
        friendList={friendListPossible}
        choosyFriendList={choosyFriendList}
        onAddMember={onAddMember}
      />
      <div className="w-full mt-5 gap-x-2 flex max-h-[50px]">
        <MyButton
          bgColor="bg-slate-200"
          width="w-[50%]"
          disabled={choosyFriendList?.length === 0}
        >
          {status === "add-member/pending" ? (
            <CircularProgress size="1rem" />
          ) : (
            "OK"
          )}
        </MyButton>

        <MyButton
          type="button"
          title="Cancel"
          bgColor="bg-slate-800"
          textColor="text-slate-200"
          width="w-[50%]"
          onClick={onClose}
        />
      </div>
    </form>
  );
};

const Settings = ({ friendId, avatar, name, modal, toggleChild }) => {
  const isGroupTab = useSelector(isGroup);
  const conversationList = useSelector(getConversationList);
  const { id: conversationId } = useParams();
  const { id: userId } = useSelector(getUser);
  const status = useSelector(getConversationsStatus);
  const [showMenu, setShowMenu] = useState(false);
  const { sizeWindow } = useUI();

  useEffect(() => {
    if (status.split("/")[1] !== "pending") {
      modal.close();
    }
  }, [status]);

  useEffect(() => {
    const triggerConversationMenu = document.getElementById(
      "trigger-conversation-menu"
    );
    const toggleHandler = (e) => {
      !triggerConversationMenu.contains(e.target) && setShowMenu(false);
    };
    document.addEventListener("mouseup", toggleHandler);

    return () => {
      document.removeEventListener("mouseup", toggleHandler);
    };
  }, []);

  const visitedConversation = useMemo(
    () => conversationList.find((con) => con._id === conversationId),
    [conversationId, conversationList]
  );

  const members = useMemo(
    () =>
      isGroupTab &&
      visitedConversation?.members.filter(
        (member) => member.memberId !== userId
      ),
    [visitedConversation, userId, isGroupTab]
  );

  const twoEarlyAvatarMembers = useMemo(
    () =>
      isGroupTab &&
      visitedConversation?.members.slice(0, 2).map((m) => m.avatar)
  );

  return (
    <>
      {status === "conversation-get/pending" ? (
        <CircularProgress />
      ) : (
        <>
          <div className="pt-5 flex-none">
            {isGroupTab ? (
              <GroupAvatar
                w1={sizeWindow === "sm" ? "w-14" : "w-20"}
                h1={sizeWindow === "sm" ? "h-14" : "h-20"}
                w2={sizeWindow === "sm" ? "w-10" : "w-16"}
                h2={sizeWindow === "sm" ? "h-10" : "h-16"}
                img1={twoEarlyAvatarMembers?.[0]}
                img2={twoEarlyAvatarMembers?.[1]}
              />
            ) : (
              <img
                className="w-20 h-20 rounded-full object-center shadow-[0_0_0_8px_#bae6fd] object-cover sm:w-14 sm:h-14"
                src={avatar}
                alt="avatar-profile-chat"
              />
            )}
            <div
              className="absolute right-0 translate-x-[-100%] top-3 cursor-pointer"
              id="trigger-conversation-menu"
              onClick={() => setShowMenu((p) => !p)}
            >
              {isGroupTab && (
                <>
                  <UilEllipsisV />
                  <AnimatePresence>
                    {showMenu && (
                      <motion.div
                        {...scaleAnimate}
                        className="absolute top-[120%] right-[0] bg-white rounded-md shadow-md origin-top-right z-[100]"
                      >
                        <ul className="w-max text-[14px] py-1 px-2">
                          <MenuItem
                            onClick={() => {
                              toggleChild("addMember");
                              modal.open();
                            }}
                            icon={<UilUserPlus className="text-[#21f121]" />}
                            title="Add member"
                          />
                          <MenuItem
                            onClick={() => {
                              toggleChild("delete");
                              modal.open();
                            }}
                            icon={<UilTrashAlt className="text-[#ff7f50]" />}
                            title="Delete conversation"
                          />
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>
          <span className="font-[600] tracking-wider text-center text-[20px] mt-[10px]">
            {name}
          </span>
          <hr className="w-full" />
          {!isGroupTab ? (
            <>
              <Link
                to={`/wall/${friendId}`}
                className="cursor-pointer px-2 py-1 flex justify-between items-center w-full rounded-[5px] duration-300 hover:bg-slate-100"
              >
                <p>Information</p>
                <UilInfoCircle />
              </Link>
              <hr className="w-full" />{" "}
            </>
          ) : (
            <MemberList memberList={members} />
          )}
        </>
      )}
    </>
  );
};

const DeleteConversationDialog = ({ onClose }) => {
  const { id: conversationId } = useParams();
  const dispatch = useDispatch();

  function deleteHandler() {
    dispatch(deleteConversation(conversationId));
  }
  return (
    <div className="shadow-md rounded-md px-3 py-2 bg-white">
      <h3 className="text-[20px] font-[500] text-center text-slate-600 py-2">
        Delete conversation
      </h3>
      <span className="text-[16px] text-center text-slate-600">
        Are you sure about that?
      </span>
      <div className="w-full mt-5 gap-x-2 flex">
        <MyButton
          title="Ok"
          bgColor="bg-red-500"
          width="w-[50%]"
          textColor="text-slate-200"
          onClick={deleteHandler}
        />
        <MyButton
          type="button"
          title="Cancel"
          bgColor="bg-slate-200"
          width="w-[50%]"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default withToggleModal(Settings, {
  delete: DeleteConversationDialog,
  addMember: AddMemberDialog,
});
