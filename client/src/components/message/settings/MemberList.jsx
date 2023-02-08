import React from 'react';
import MemberItem from './MemberItem';

const MemberList = ({ memberList }) => {
  return (
    <>
      <ul className="flex flex-col gap-y-0.5 w-full h-max overflow-auto pr-2">
        {memberList?.map((member) => {
          return (
            <MemberItem
              key={member.memberId}
              avatar={member.avatar}
              name={member.nickname}
              linkProfile={`/wall/${member.memberId}`}
            />
          );
        })}
      </ul>
    </>
  );
};

export default MemberList;
