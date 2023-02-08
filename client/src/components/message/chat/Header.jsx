import useUI from "../../../hooks/useUI";
import { useSelector } from "react-redux";
import { getConversationsStatus, isGroup } from "../../../store/selectors";
import GroupAvatar from "../GroupAvatar";
import InfoIcon from "@mui/icons-material/Info";
import { CircularProgress } from "@mui/material";
import MenuIcon from "../../ui/MenuIcon";

const Header = ({ avatar, name }) => {
  const isGroupTab = useSelector(isGroup);
  const status = useSelector(getConversationsStatus);
  const {
    onToggleConversationList,
    sizeWindow,
    showConversationList,
    isShowInfor,
    onToggleConverInfor,
  } = useUI();

  const menuIconClickHandler = () => {
    onToggleConversationList();
  };

  return (
    <header className="w-full flex items-center shadow-[0_10px_20px_-5px_#0000003f] py-2 px-5 rounded-[20px_20px_0_0] gap-x-4">
      {status === "conversation-get/pending" || !avatar ? (
        <CircularProgress />
      ) : (
        <>
          <div className="flex-none">
            {isGroupTab ? (
              <GroupAvatar img1={avatar?.[0]} img2={avatar?.[1]} />
            ) : (
              <img
                src={avatar}
                alt="avatar-chat"
                className="w-7 h-7 object-cover object-center rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[18px] font-[500] tracking-wider text-slate-600 truncate">
              {name}
            </span>
          </div>
        </>
      )}
      <div className="ml-auto flex gap-x-2 items-center">
        {sizeWindow === "sm" && (
          <MenuIcon
            onClick={menuIconClickHandler}
            isClose={showConversationList}
          />
        )}
        <div
          className={`ml-auto ${
            isShowInfor ? "shadow-[0_0_0_4px_#00000012]" : ""
          } duration-300 cursor-pointer rounded-full w-auto h-auto  flex items-center`}
          onClick={onToggleConverInfor}
        >
          <InfoIcon sx={{ fontSize: 25, color: "#bfdbce" }} />
        </div>
      </div>
    </header>
  );
};

export default Header;
