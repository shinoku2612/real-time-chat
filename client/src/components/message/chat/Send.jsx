import React from 'react';
import { UilPaperclip, UilMessage, UilSmile } from '@iconscout/react-unicons';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '../../../store/message-slice';
import useInput from '../../../hooks/useInput';
import { validateEmpty } from '../../../utils/validate';
import getSocketIO, {
  sendMessage as sendMessageToSocketIO,
} from '../../../services/socketIO';
import { getUser } from '../../../store/selectors';
import { setLastMsg } from '../../../store/conversation-slice';

const Send = ({ conversationId, receiverId }) => {
  const dispatch = useDispatch();
  const { id: userId } = useSelector(getUser);

  const {
    state: { value, isValid },
    actions: { onChange, onBlur, reset },
  } = useInput(validateEmpty);

  function send() {
    dispatch(sendMessage(conversationId, value));
    dispatch(
      setLastMsg({
        conversationId,
        lastMsg: {
          text: value,
          senderId: userId,
          createdAt: new Date().toISOString(),
        },
      }),
    );
    sendMessageToSocketIO(
      {
        senderId: userId,
        text: value,
        receiverId,
        conversationId,
      },
      getSocketIO(),
    );
    reset();
  }

  function sendMessageHandler() {
    if (!isValid) return;

    send();
  }

  function enterHandler(e) {
    if (e.code !== 'Enter' || !isValid) return;
    send();
  }

  return (
    <div className="w-full mt-auto bg-white rounded-md bottom-0 border border-slate-400 flex py-1 px-2 text-[14px]">
      <input
        onChange={onChange}
        onKeyDown={enterHandler}
        value={value}
        onBlur={onBlur}
        placeholder="Write a message..."
        type="text"
        className="w-full border-none outline-none text-slate-600"
      />
      <div className="flex gap-x-2 text-slate-400 text-[16px] items-center">
        <UilPaperclip className="cursor-pointer" />
        <UilSmile className="cursor-pointer" />
        <div
          className="w-max h-max p-1 rounded-[8px] bg-blue-300 cursor-pointer"
          onClick={sendMessageHandler}
        >
          <UilMessage size="20" color="white" className="" />
        </div>
      </div>
    </div>
  );
};

export default Send;
