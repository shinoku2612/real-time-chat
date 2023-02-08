import axios from 'axios';
import { logout, refreshToken } from '../store/authen-slice';
import jwt_decode from 'jwt-decode';

export const publicRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export const privateRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export const setUpInterceptor = ({ dispatch, getState }) =>
  privateRequest.interceptors.request.use(
    async (config) => {
      let {
        accessToken,
        userInformation: { id: userId },
      } = getState().authentication;
      try {
        if (accessToken) {
          const decodedToken = jwt_decode(accessToken);
          const currentTimeStamp = new Date().getTime();
          const expTime = decodedToken.exp * 1000;
          if (expTime <= currentTimeStamp) {
            const newAccessToken = await dispatch(refreshToken(userId));
            accessToken = newAccessToken;
          }
          config.headers['x-authorization'] = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.log('refreshToken error', error);
        dispatch(logout(userId));
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
