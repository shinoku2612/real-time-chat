import { privateRequest } from '../axios';

export const searchUser = async (name) =>
  await privateRequest.get('/users', { params: { name } });
