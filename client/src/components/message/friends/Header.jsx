import { useMemo } from "react";
import { getConversationList } from "../../../store/selectors";
import { useSelector } from "react-redux";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import withModal from "../../../hoc/withModal";
import Search from "../../ui/search/Search";
import NewConversation from "./NewConversation";
import useUI from "../../../hooks/useUI";

const Header = ({ modal, onSearch }) => {
  const conversationList = useSelector(getConversationList);
  const newInbox = useMemo(() => {
    return conversationList.reduce(
      (acc, con) => acc + +(con?.isUnSeen ?? 0),
      0
    );
  }, [conversationList]);

  const { onHideConversationList } = useUI();

  const addConversationHandler = () => {
    modal.open();
    onHideConversationList();
  };

  return (
    <>
      <header className="flex justify-between items-center w-full py-1 text-slate-600">
        <div className="w-full flex items-center gap-x-2 ">
          <span className="font-bold">Inbox</span>
          {newInbox > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-400 font-bold">
              {newInbox} New
            </span>
          )}
        </div>
        <GroupAddIcon
          className="cursor-pointer"
          sx={{ fontSize: 25 }}
          onClick={addConversationHandler}
        />
      </header>
      <div className="text-[14px] w-full">
        <Search
          onSearch={onSearch}
          bgColor="bg-slate-200 text-[14px] sm:px-2 sm:py-1"
          placeholder="search chat..."
        />
      </div>
    </>
  );
};

export default withModal(Header, NewConversation);
