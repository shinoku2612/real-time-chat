import { privateRequest } from '../axios';

export const createConversation = async (userId, members, isGroup, title) =>
  await privateRequest.post(
    `conversations/${userId}/create`,
    { theme: 'default', members, title },
    { params: { group: isGroup } },
  );

export const getConversation = async (userId, isGroup) =>
  await privateRequest.get(`conversations/${userId}/get`, {
    params: {
      isGroup,
    },
  });

export const addNewMember = async (conversationId, newMembers) =>
  await privateRequest.put(`conversations/${conversationId}/add-member`, {
    newMembers,
  });

export const deleteConversation = async (conversationId) =>
  await privateRequest.delete(`conversations/${conversationId}/delete`);
