import { createSlice } from "@reduxjs/toolkit";
import { notify } from "./notification-slice";
import * as friendService from "../services/friend";
import { showLoading, hideLoading } from "./ui-slice";
import {
  addFriendRequest,
  removeFriendResponse,
  addFriendList,
  removeFriendList,
} from "./authen-slice";
import { deleteConversation, addConversation } from "./conversation-slice";
import * as conversationService from "../services/conversation";

const convertData = (data) => ({
  slogan: data.biography,
  dob: data.birthday,
  email: data.email,
  gender: data.gender,
  firstName: data.firstName,
  lastName: data.lastName,
  phone: data.phone,
  id: data._id,
  join: data.createdAt,
  address: data.address,
  friendList: data.friendList,
  avatar: data.avatar,
  coverPicture: data.coverPicture,
});
const INIT_STATE = {
  friendInformation: {
    avatar: "",
    coverPicture: "",
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    email: "",
    dob: "",
    slogan: "",
    address: "",
    join: "",
    friendList: [],
  },
  status: "idle",
};

const friendSlice = createSlice({
  name: "friend",
  initialState: INIT_STATE,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
    setState(state, action) {
      state.status = action.payload;
    },
    addFriendListOfFriend(state, action) {
      state.friendInformation.friendList.push(action.payload);
    },
    setFriend(state, action) {
      state.friendInformation = {
        ...action.payload,
      };
    },
    setFriendList(state, action) {
      state.friendInformation.friendList = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    removeFriendListOfFriend(state, action) {
      const { friendList } = state.friendInformation;
      state.friendInformation.friendList = friendList.filter(
        (friend) => friend._id !== action.payload
      );
    },
  },
});

export const unfriend = (receiverId) => async (dispatch, getState) => {
  dispatch(showLoading());
  try {
    const userId = getState().authentication.userInformation.id;
    await friendService.unfriend(userId, receiverId);

    const { _id: conversationId } = getState().conversation.conversations.find(
      (con) => {
        const members = con.members;
        const membersId = members.map((mem) => mem.memberId);
        return (
          members.length === 2 &&
          membersId.includes(userId) &&
          membersId.includes(receiverId)
        );
      }
    );

    dispatch(deleteConversation(conversationId, true));
    dispatch(removeFriendList(receiverId));
    dispatch(removeFriendListOfFriend(userId));
    dispatch(setStatus("unfriend/success"));
  } catch (error) {
    console.log(`unfriend error ${error}`);
    dispatch(setStatus("unfriend/failed"));
  } finally {
    dispatch(hideLoading());
  }
};

export const getFriend = (friendId) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const responseFriend = friendService.getFriend(friendId);
    const responseFriendList = friendService.getFriendList(friendId);

    const { data: friendData } = await responseFriend;
    const { data: friendListData } = await responseFriendList;

    const friendInfor = convertData(friendData);
    friendInfor.friendList = friendListData;

    dispatch(setFriend(friendInfor));
    dispatch(setStatus("get-friend/success"));
  } catch (error) {
    console.log(`geFriend error ${error}`);
    dispatch(setStatus("get-friend/failed"));
  } finally {
    dispatch(hideLoading());
  }
};

export const responseAddFriend =
  ({ receiverId, accepted }) =>
  async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const userState = getState().authentication.userInformation;
      const { data: receiver } = await friendService.responseAddFriend(
        userState.id,
        {
          receiverId,
          accepted,
        }
      );

      if (accepted) {
        // create conversation
        const createConRes = await conversationService.createConversation(
          userState.id,
          [
            {
              memberId: userState.id,
              nickname: `${userState.firstName} ${userState.lastName}`,
            },
            {
              memberId: receiverId,
              nickname: `${receiver.firstName} ${receiver.lastName}`,
            },
          ],
          false
        );

        dispatch(addConversation(createConRes.data));

        // add to user
        dispatch(addFriendList(receiver));

        // add to current friend
        dispatch(
          addFriendListOfFriend({
            _id: userState.id,
            firstName: userState.firstName,
            lastName: userState.lastName,
            avatar: userState.avatar,
            biography: userState.slogan,
            coverPicture: userState.coverPicture,
          })
        );
      }

      dispatch(removeFriendResponse(receiverId));
    } catch (error) {
      console.log("response add friend error", error);
    } finally {
      dispatch(hideLoading());
    }
  };

export const sendAddFriend = (receiverId) => async (dispatch, getState) => {
  const userState = getState().authentication.userInformation;
  dispatch(showLoading());
  try {
    await friendService.sendAddFriend(userState.id, receiverId);
    await dispatch(
      notify({
        senderId: userState.id,
        senderName: `${userState.firstName} ${userState.lastName}`,
        senderAvatar: userState.avatar,
        receiverId,
        notify: "Make friend, happy together!",
        isResponse: false,
      })
    );

    // add to user
    dispatch(addFriendRequest(receiverId));
    dispatch(setStatus("send-add-friend/success"));
  } catch (error) {
    console.log(`send add friend error ${error}`);
    dispatch(setStatus("send-add-friend/failed"));
  } finally {
    dispatch(hideLoading());
  }
};

export const {
  resetStatus,
  addFriendListOfFriend,
  setFriendList,
  setFriend,
  removeFriendListOfFriend,
  setStatus,
} = friendSlice.actions;
export default friendSlice.reducer;
