import { privateRequest } from '../axios';

export const getNotifications = async (userId) =>
  await privateRequest.get(`/notifications/${userId}/get`);

export const sendNotify = async (userId, notification) =>
  privateRequest.post(`/notifications/${userId}/create`, { ...notification });

export const updateNotification = async (userId, notificationId) =>
  await privateRequest.put(`/notifications/${userId}/edit/${notificationId}`, {
    isResponse: true,
  });

export const removeNotification = async (userId, notificationId) =>
  await privateRequest.delete(`/notifications/${userId}/delete/${notificationId}`);
