import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WallAvatar from "../../components/wall/WallAvatar";
import Biography from "../wall/Biography";
import Friend from "../wall/Friend";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  getFriendInformation,
  getFriendStatus,
  getStatus,
} from "../../store/selectors";
import { getFriend, resetStatus } from "../../store/friend-slice";

const Wall = () => {
  const user = useSelector(getUser);
  const friend = useSelector(getFriendInformation);
  const [
    {
      firstName,
      lastName,
      dob,
      slogan,
      join,
      friendList,
      avatar,
      coverPicture,
    },
    setInformationOfWall,
  ] = useState(user);

  const navigate = useNavigate();

  const status = useSelector(getFriendStatus);
  const userStatus = useSelector(getStatus);
  const { id } = useParams();
  const dispatch = useDispatch();

  const isOwn = useMemo(() => id === user.id || id === "me", [id, user.id]);

  const isFriend = useMemo(() => {
    return user.friendList?.some((friend) => friend._id === id);
  }, [user.friendList, id]);

  const isPending = useMemo(() => {
    return user.friendRequest?.some((friendId) => friendId === id);
  }, [user.friendRequest, id]);

  const isResponse = useMemo(() => {
    return user.friendResponse?.some((friendId) => friendId === id);
  }, [user.friendResponse, id]);

  useEffect(() => {
    if (status === "get-friend/success") {
      setInformationOfWall(friend);
      dispatch(resetStatus());
    }
    if (status === "get-friend/failed") {
      navigate(`/wall/me`);
      dispatch(resetStatus());
    }
  }, [status, friend, dispatch, navigate]);

  useEffect(() => {
    setInformationOfWall(isOwn ? user : friend);
  }, [userStatus, isOwn, user, friend]);

  useEffect(() => {
    if (!isOwn) {
      dispatch(getFriend(id));
    }
  }, [id, isOwn, dispatch]);

  return (
    <div className="format-page-size flex items-center flex-col mt-[-10px]">
      <WallAvatar
        fullName={`${firstName} ${lastName}`}
        avatar={avatar}
        isOwned={isOwn}
        isFriend={isFriend}
        isPending={isPending}
        isResponse={isResponse}
        coverPicture={coverPicture}
      />
      <section className="text-slate-600 mt-[150px] flex items-start gap-x-5 xl:w-[1300px] h-full pb-5 mx-auto w-[90%] sm:mt-[100px]">
        <Biography join={join} slogan={slogan} dob={dob} />
        <Friend friendList={friendList} />
      </section>
    </div>
  );
};

export default Wall;
