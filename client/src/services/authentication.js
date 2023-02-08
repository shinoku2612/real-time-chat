import { publicRequest } from '../axios';

export const login = async (email, password) =>
  await publicRequest.post('/auth/login', { email, password });

export const register = async ({ firstName, lastName, email, password }) =>
  await publicRequest.post('/auth/register', {
    firstName,
    lastName,
    email,
    password,
    gender: 'female',
    birthday: new Date().toISOString(),
    phone: new Date().getTime(),
  });

export const refreshToken = async (userId) =>
  await publicRequest.post(`/auth/refresh-token`, {
    userId,
  });

export const logout = async (userId) =>
  await publicRequest.post(`/auth/${userId}/logout`);
