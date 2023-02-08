import { createSlice } from '@reduxjs/toolkit';

const INIT_STATE = {
  notification: {
    status: null,
    message: '',
    title: '',
  },
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: INIT_STATE,
  reducers: {
    showNotification(state, { payload: { status, message, title } }) {
      Object.assign(state.notification, {
        status,
        message,
        title,
      });
    },
    hideNotification(state) {
      state.notification.status = null;
    },
    showLoading(state) {
      state.isLoading = true;
    },
    hideLoading(state) {
      state.isLoading = false;
    },
  },
});

export const { showLoading, hideLoading } = uiSlice.actions;
export default uiSlice.reducer;
