import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../../store/selectors";
import { useEffect } from "react";
import getSocketIO, {
  getAddFriend,
  removeGetAddFriend,
} from "../../services/socketIO";
import { addNotification } from "../../store/notification-slice";
import { addFriendResponse } from "../../store/authen-slice";

const RequireAuth = () => {
  const token = useSelector(getToken);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      getSocketIO(token);
    }
  }, [token]);

  useEffect(() => {
    const socket = getSocketIO();
    if (socket?.connected) {
      const getAddFriendHandler = (payload) => {
        console.log({ payload });
        dispatch(addNotification(payload));
        dispatch(addFriendResponse(payload.senderId));
      };
      getAddFriend(getAddFriendHandler, socket);
      return () => removeGetAddFriend(getAddFriendHandler, socket);
    }
  }, [getSocketIO()?.connected]);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: pathname }} replace />
  );
};

export default RequireAuth;
