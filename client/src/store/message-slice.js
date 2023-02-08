import { createSlice } from "@reduxjs/toolkit";
import * as messageService from "../services/message";

const INIT_STATE = {
  messages: [],
  status: "idle",
  message: "",
  hasMore: true,
  hasGetMore: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState: INIT_STATE,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    resetStatus(state) {
      state.status = "idle";
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
      state.hasGetMore = false;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    concatMessages(state, action) {
      state.messages = [...action.payload, ...state.messages];
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    hasMore(state, action) {
      state.hasMore = action.payload;
    },
    hasGetMore(state, action) {
      state.hasGetMore = action.payload;
    },
  },
});

export const sendMessage =
  (conversationId, msg) => async (dispatch, getState) => {
    const {
      userInformation: { id: userId },
    } = getState().authentication;
    try {
      dispatch(setStatus("send-message/pending"));
      const { data } = await messageService.sendMessage(
        userId,
        conversationId,
        msg
      );
      dispatch(addMessage(data));
      dispatch(setStatus("send-message/success"));
    } catch (error) {
      console.dir(error);
      dispatch(setStatus("send-message/failed"));
    }
  };

export const getMessages =
  (conversationId, userId, start, length) => async (dispatch, getState) => {
    const { userInformation: userState } = getState().authentication;
    try {
      start === 0 && dispatch(setStatus("get-message/pending"));
      const { data } = await messageService.getMessage(
        conversationId,
        userId ?? userState.id,
        start,
        length
      );
      start > 0 ? dispatch(concatMessages(data)) : dispatch(setMessages(data));
      data.length === 0 && dispatch(hasMore(false));
      dispatch(setStatus("get-message/success"));
    } catch (error) {
      console.dir(error);
      dispatch(setStatus("get-message/failed"));
    }
  };

export const {
  setStatus,
  addMessage,
  setMessage,
  setMessages,
  resetStatus,
  concatMessages,
  hasMore,
  hasGetMore,
} = messageSlice.actions;

export default messageSlice.reducer;
