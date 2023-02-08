import io from "socket.io-client";

const GET_MESSAGE = "GET_MESSAGE";
const SEND_MESSAGE = "SEND_MESSAGE";
const ADD_USER = "ADD_USER";
const GET_USER_ONLINE = "GET_USER_ONLINE";
const CALL_USER_ONLINE = "CALL_USER_ONLINE";
const UPDATE_CONVERSATION = "UPDATE_CONVERSATION";
const INIT_CONVERSATION = "INIT_CONVERSATIONS";
const GET_STATE_CONVERSATIONS = "GET_STATE_CONVERSATIONS";
const UPDATE_STATE_CONVERSATION = "UPDATE_STATE_CONVERSATION";
const JOIN_ROOM = "JOIN_ROOM";
const ADD_FRIEND = "ADD_FRIEND";

const getSocketIO = (() => {
  let socket = null;
  return (token) => {
    if (!socket?.connected && token) {
      socket = io(process.env.REACT_APP_SOCKET_URL, {
        query: { token },
      });
    }
    socket?.on("connect", () => {
      console.log("connect successfully");
    });

    socket?.on("connect_error", (error) => {
      console.log(`connect error: ${error}`);
    });

    return socket;
  };
})();

export const connectHandler = (callback, socket) =>
  socket?.on("connect", callback);

export const connectErrorHandler = (callback, socket) =>
  socket?.on("connect_error", callback);

export const getMessage = (callback, socket) =>
  socket?.on(GET_MESSAGE, callback);

export const initConversations = (userId, socket) =>
  socket?.emit(INIT_CONVERSATION, userId);

export const getInitConversations = (callback, socket) =>
  socket?.on(INIT_CONVERSATION, callback);

export const getUserOnline = (callback, socket) =>
  socket?.on(GET_USER_ONLINE, callback);

export const callUserOnline = (socket) => socket?.emit(CALL_USER_ONLINE);

export const addUser = (userId, socket) => socket?.emit(ADD_USER, userId);

export const sendMessage = (payload, socket) =>
  socket?.emit(SEND_MESSAGE, payload);

export const getStateConversations = (callback, socket) =>
  socket?.on(GET_STATE_CONVERSATIONS, callback);

export const emitGetStateConversations = (payload, socket) =>
  socket?.emit(GET_STATE_CONVERSATIONS, payload);

export const removeGetMessage = (callback, socket) =>
  socket?.off(GET_MESSAGE, callback);

export const removeGetUserOnline = (callback, socket) =>
  socket?.off(GET_USER_ONLINE, callback);

export const removeCallUserOnline = (callback, socket) =>
  socket?.off(CALL_USER_ONLINE, callback);

export const removeInitConversations = (callback, socket) =>
  socket?.off(INIT_CONVERSATION, callback);

export const updateStateConversation = (payload, socket) =>
  socket?.emit(UPDATE_STATE_CONVERSATION, payload);

export const socketDisconnect = (payload, socket) => {
  console.log("disconnect handler", payload);
  socket?.emit(UPDATE_CONVERSATION, payload);
  socket?.disconnect();
};

export const sendAddFriend = (payload, socket) =>
  socket?.emit(ADD_FRIEND, payload);

export const removeGetStateConversations = (callback, socket) =>
  socket?.off(GET_STATE_CONVERSATIONS, callback);

export const joinRoom = (rooms, socket) => socket?.emit(JOIN_ROOM, rooms);

export const getStateConversation = (callback, socket) =>
  socket?.on(UPDATE_STATE_CONVERSATION, callback);

export const removeGetStateConversation = (callback, socket) =>
  socket?.off(UPDATE_STATE_CONVERSATION, callback);

export const getAddFriend = (callback, socket) =>
  socket?.on(ADD_FRIEND, callback);
export const removeGetAddFriend = (callback, socket) =>
  socket?.off(ADD_FRIEND, callback);

export default getSocketIO;
