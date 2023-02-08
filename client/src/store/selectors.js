// const getAuthenticationState = state => type => state.authentication[type]
export const getMessageAuthen = (state) => state.authentication.message;
export const getStatus = (state) => state.authentication.status;
// export const getStatus = getAuthenticationState(state)('status')
export const getToken = (state) => state.authentication.accessToken;
// export const getToken = getAuthenticationState(state)('s')
export const getUser = (state) => state.authentication.userInformation;
export const hasLogged = (state) => state.authentication.isLogged;

export const getFriendStatus = (state) => state.friend.status;
export const getFriendInformation = (state) => state.friend.friendInformation;

export const getNotifications = (state) => state.notifications.notifications;
export const getStatusNotification = (state) => state.notifications.status;
export const getCreatedNotifiId = (state) =>
  state.notifications.createdNotificationId;

export const hasLoading = (state) => state.ui.isLoading;

export const getSearchStatus = (state) => state.search.status;
export const getSearchUsers = (state) => state.search.users;

export const hasLoadingLogin = (state) => state.ui.isLoadingLogin;

export const getConversationList = (state) => state.conversation.conversations;
export const isGroup = (state) => state.conversation.isGroup;
export const getConversationsStatus = (state) => state.conversation.status;

export const getMessageList = (state) => state.message.messages;
export const getStatusMessage = (state) => state.message.status;
export const getLastedMessage = (state) =>
  state.message.messages[state.message.messages.length - 1];
export const hasMore = (state) => state.message.hasMore;
export const hasGetMore = (state) => state.message.hasGetMore;
