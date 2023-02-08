import { useState } from 'react';

const useAddMembers = () => {
  const [choosyFriendList, setChoosyFriendList] = useState([]);

  function addMemberHandler({ memberId, nickname, avatar }) {
    choosyFriendList.map(({ memberId }) => memberId).includes(memberId)
      ? setChoosyFriendList((prev) =>
        prev.filter(({ memberId: id }) => id !== memberId),
      )
      : setChoosyFriendList((prev) =>
        prev.concat({ memberId, nickname, avatar }),
      );
  }

  return { choosyFriendList, onAddMember: addMemberHandler };
};

export default useAddMembers;
