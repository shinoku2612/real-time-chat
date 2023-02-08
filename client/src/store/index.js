import { configureStore } from '@reduxjs/toolkit';
import UiReducer from './ui-slice';
import AuthenticationReducer from './authen-slice';
import FriendReducer from './friend-slice';
import NotificationsReducer from './notification-slice';
import SearchReducer from './search-slice';
import ConversationReducer from './conversation-slice';
import MessageReducer from './message-slice';

const store = configureStore({
  reducer: {
    ui: UiReducer,
    authentication: AuthenticationReducer,
    friend: FriendReducer,
    notifications: NotificationsReducer,
    search: SearchReducer,
    message: MessageReducer,
    conversation: ConversationReducer,
  },
});

export default store;
