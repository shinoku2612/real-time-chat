import { createSlice } from "@reduxjs/toolkit";
import { setLocal, removeLocal } from "../services/localServices";
import { showLoading, hideLoading } from "./ui-slice";
import { getNotifications } from "./notification-slice";
import { getConversation } from "./conversation-slice";
import * as authenticationService from "../services/authentication";
import * as userService from "../services/user";
import * as firebaseService from "../services/firebase";

export const convertData = (data) => ({
  accessToken: data.accessToken,
  userInformation: {
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
    avatar: data.avatar,
    coverPicture: data.coverPicture,
    friendRequest: data.friendRequest,
    friendResponse: data.friendResponse,
  },
});

const INIT_STATE = {
  accessToken: null,
  userInformation: {},
  status: "idle",
  message: null,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: INIT_STATE,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
    setToken(state, action) {
      state.accessToken = action.payload;
    },
    addFriendRequest(state, action) {
      state.userInformation.friendRequest.push(action.payload);
    },
    addFriendResponse(state, action) {
      state.userInformation.friendResponse.push(action.payload);
    },
    removeFriendResponse(state, action) {
      const friendResponseList = state.userInformation.friendResponse;
      state.userInformation.friendResponse = friendResponseList.filter(
        (friendId) => friendId !== action.payload
      );
    },
    removeFriendList(state, action) {
      const { friendList } = state.userInformation;
      state.userInformation.friendList = friendList.filter(
        (friend) => friend._id !== action.payload
      );
    },
    addFriendList(state, action) {
      state.userInformation.friendList = [
        ...state.userInformation.friendList,
        action.payload,
      ];
    },
    setLogout(state) {
      state.accessToken = null;
      state.userInformation = {};
    },
    setUser(state, action) {
      state.userInformation = action.payload.userInformation;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setAvatar(state, action) {
      state.userInformation.avatar = action.payload;
    },
    setCoverPicture(state, action) {
      state.userInformation.coverPicture = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
  },
});

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(showLoading());
    try {
      dispatch(setStatus("login/pending"));
      const { data } = await authenticationService.login(email, password);
      dispatch(setToken(data.accessToken));

      const userData = convertData(data);
      const userId = userData.userInformation.id;

      const getFriendList = userService.getFriendListOfUser(userId);
      const getNotificationsOfUser = dispatch(getNotifications(userId));
      const getConversationOfUser = dispatch(getConversation({ userId }));

      const { data: friendList } = await getFriendList;
      await getNotificationsOfUser;
      await getConversationOfUser;

      userData.userInformation.friendList = friendList;

      setLocal("userId", userId);
      dispatch(setUser(userData));
      dispatch(setStatus("login/success"));
    } catch (error) {
      console.log("login error", error);
      dispatch(setStatus("login/failed"));
      dispatch(setMessage(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };

export const register =
  ({ firstName, lastName, email, password }) =>
  async (dispatch) => {
    dispatch(showLoading());
    dispatch(setStatus("register/pending"));
    try {
      await authenticationService.register({
        firstName,
        lastName,
        email,
        password,
      });
      dispatch(setStatus("register/success"));
    } catch (error) {
      console.log("register error: ", error);
      dispatch(setStatus("register/failed"));
    } finally {
      dispatch(hideLoading());
    }
  };

export const refreshToken = (userId) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const response = await authenticationService.refreshToken(userId);
    dispatch(setToken(response.data.accessToken));
    return response.data.accessToken;
  } catch (error) {
    console.log("refreshToken error: ", error);
    dispatch(logout(userId));
  } finally {
    dispatch(hideLoading());
  }
};

export const logout = (userId) => async (dispatch) => {
  try {
    removeLocal("userId");
    dispatch(setLogout());
    await authenticationService.logout(userId);
    console.log("logout done");
  } catch (error) {
    console.log("logout error: ", error);
  }
};

export const getUserInformation = (userId) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const responseUserInfor = userService.getUser(userId);
    const responseFriendList = userService.getFriendListOfUser(userId);
    const getNotificationsOfUser = dispatch(getNotifications(userId));

    const { data: user } = await responseUserInfor;
    const { data: friendList } = await responseFriendList;
    await getNotificationsOfUser;

    const userData = convertData(user);
    userData.userInformation.friendList = friendList;

    dispatch(setUser(userData));
  } catch (error) {
    console.log("get user error", error);
    dispatch(logout(userId));
  } finally {
    dispatch(hideLoading());
  }
};

export const updateUser = (userInfor) => async (dispatch, getState) => {
  dispatch(showLoading());
  try {
    const userId = getState().authentication?.userInformation?.id;
    const { data } = await userService.updateUser(userId, userInfor);

    dispatch(setUser(convertData(data)));
    dispatch(setStatus("update-user/success"));
  } catch (error) {
    console.log("update-user error: ", error);
    dispatch(setStatus("update-user/failed"));
  } finally {
    dispatch(hideLoading());
  }
};

export const updateAvatar = (avatarSrc) => async (dispatch, getState) => {
  const userState = getState().authentication.userInformation;
  try {
    dispatch(showLoading());
    await firebaseService.uploadAvatar(userState.id, avatarSrc);
    const { data } = await userService.updateAvatar(userState.id);
    dispatch(setAvatar(data));
    dispatch(setStatus("update-avatar/success"));
  } catch (error) {
    console.log(`updateAvatar error ${error}`);
    dispatch(setStatus("update-avatar/failed"));
  } finally {
    dispatch(hideLoading());
  }
};

export const updateCoverPicture = (bgSrc) => async (dispatch, getState) => {
  const userState = getState().authentication.userInformation;
  try {
    dispatch(showLoading());
    await firebaseService.uploadCoverPicture(userState.id, bgSrc);
    const { data } = await userService.updateCoverPicture(userState.id);
    dispatch(setCoverPicture(data));
    dispatch(setStatus("update-background/success"));
  } catch (error) {
    console.log(`updateCoverPicture error ${error}`);
    dispatch(setStatus("update-background/failed"));
  } finally {
    dispatch(hideLoading());
  }
};

export const persistLogin = (userId) => async (dispatch) => {
  try {
    await dispatch(refreshToken(userId));
    await dispatch(getUserInformation(userId));
  } catch (error) {
    console.log("persistLogin error", error);
  } finally {
    dispatch(setStatus("persist-login/finish"));
  }
};

export const {
  resetStatus,
  setAccessToken,
  addFriendRequest,
  removeFriendResponse,
  addFriendList,
  removeFriendList,
  setUser,
  setStatus,
  setToken,
  setLogout,
  setAvatar,
  setCoverPicture,
  setMessage,
  addFriendResponse,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
