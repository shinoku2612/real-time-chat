import { privateRequest } from '../axios';

export const getFriendListOfUser = async (userId) =>
  await privateRequest.get(`users/${userId}/friends`);

export const getUser = async (userId) =>
  await privateRequest.get(`/users/find/${userId}`);

export const updateUser = async (userId, userInfor) =>
  await privateRequest.put(`/users/${userId}/edit`, {
    ...userInfor,
  });

export const updateAvatar = async (userId) =>
  await privateRequest.put(`/users/${userId}/avatar`);

export const updateCoverPicture = async (userId) =>
  await privateRequest.put(`/users/${userId}/cover-picture`);
