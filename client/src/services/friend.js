import { privateRequest } from '../axios';

export const getFriendList = async (userId) =>
  await privateRequest.get(`/users/${userId}/friends`);

export const unfriend = async (userId, receiverId) =>
  await privateRequest.put(`/users/${userId}/friends/unfriend`, null, {
    params: { receiverId },
  });

export const getFriend = async (friendId) =>
  await privateRequest.get(`/users/find/${friendId}`);

export const responseAddFriend = async (userId, { receiverId, accepted }) =>
  await privateRequest.put(`/users/${userId}/friends/response`, null, {
    params: {
      receiverId,
      accepted,
    },
  });

export const sendAddFriend = async (userId, receiverId) =>
  await privateRequest.put(`/users/${userId}/friends/add`, null, {
    params: {
      receiverId,
    },
  });
