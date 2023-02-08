import { useEffect, useRef } from "react";
import { InputInformation } from "../../ui/input/MyInput";
import MyButton from "../../ui/button/MyButton";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useSelector } from "react-redux";
import { validateEmpty } from "../../../utils/validate";
import { getConversationsStatus, getUser } from "../../../store/selectors";
import { useDispatch } from "react-redux";
import { createConversation } from "../../../store/conversation-slice";
import useAddMembers from "../../../hooks/useAddMembers";

export const MemberItem = ({
  fullName,
  friendId,
  avatar,
  onAddMember,
  isChoosy,
}) => {
  function changeHandler(e) {
    onAddMember({ memberId: e.target.value, nickname: fullName, avatar });
  }
  return (
    <li className="flex items-center gap-x-2 mt-2 justify-between px-2 py-1 rounded-md text-slate-600 font-[500]">
      <div className="flex items-center gap-x-2">
        <img
          src={avatar}
          alt="avatar"
          className="border-2 border-solid border-white w-7 h-7 object-cover object-center rounded-full"
        />
        <span className="text-[15px]">{fullName}</span>
      </div>
      <label
        className={`${
          isChoosy ? "text-sky-700" : ""
        } cursor-pointer px-2 duration-300`}
        htmlFor={friendId}
      >
        <GroupAddIcon sx={{ fontSize: 22 }} />
      </label>
      <input
        className="hidden outline-none border-none"
        type="checkbox"
        onChange={changeHandler}
        id={friendId}
        value={friendId}
        checked={isChoosy}
      />
    </li>
  );
};

export const MemberList = ({ friendList, onAddMember, choosyFriendList }) => {
  console.log({ friendList });
  return (
    <ul className=" overflow-y-auto max-h-[30vh]">
      {friendList?.map((friend) => {
        return (
          <MemberItem
            key={friend._id}
            avatar={friend.avatar}
            fullName={`${friend?.firstName} ${friend?.lastName}`}
            friendId={friend._id}
            isChoosy={choosyFriendList
              .map(({ memberId }) => memberId)
              .includes(friend._id)}
            onAddMember={onAddMember}
          />
        );
      })}
    </ul>
  );
};

const NewConversation = ({ onClose }) => {
  const dispatch = useDispatch();
  const status = useSelector(getConversationsStatus);
  const { choosyFriendList, onAddMember } = useAddMembers();
  const user = useSelector(getUser);

  const nameRef = useRef();

  useEffect(() => {
    if (status.split("/")[1] !== "pending" && status !== "idle") {
      onClose();
    }
  }, [status]);

  function submitHandler(e) {
    e.preventDefault();

    if (!nameRef.current.isValid) return;

    dispatch(
      createConversation({
        members: choosyFriendList.concat({
          memberId: user.id,
          nickname: `${user.firstName} ${user.lastName}`,
          avatar: user.avatar,
        }),
        isGroup: true,
        title: nameRef.current.value.trim(),
      })
    );
  }

  console.log(user?.friendList);

  return (
    <form
      onSubmit={submitHandler}
      className="px-3 h-max  bg-white rounded-md w-full pt-2 pb-5 text-slate-500"
    >
      <h3 className="text-sm font-[500] text-center pb-2 sm:text-[18px]">
        New Group
      </h3>
      <InputInformation
        ref={nameRef}
        title="Name"
        validateFn={validateEmpty}
        errorText="Name is not empty!"
      />
      <div className="w-full h-max mt-2">
        {user?.friendList?.length > 0 ? (
          <>
            <h3 className="text-[16px] font-[500]">Members </h3>
            <MemberList
              friendList={user.friendList}
              onAddMember={onAddMember}
              choosyFriendList={choosyFriendList}
            />
          </>
        ) : (
          <p className="text-center text-[18px] sm:text-[14px]">
            You don't have any friends!
          </p>
        )}
      </div>
      <div className="w-full mt-5 gap-x-2 flex">
        <MyButton
          title="Ok"
          bgColor="bg-slate-200"
          width="w-[50%]"
          disabled={choosyFriendList?.length === 0}
        />
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

export default NewConversation;
