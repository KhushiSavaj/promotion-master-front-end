import localStore from "./localstore.util";

export const getToken = () => 'Bearer '+localStore.get_data("token");

export const setToken = (token) => localStore.store_data("token", token.replaceAll('Bearer ',''));

export const getNotificationToken = () => localStore.get_data("Notification_token");

export const setNotificationToken = (Notification_token) => localStore.store_data("Notification_token", Notification_token);

export const removeNotificationToken = () => localStore.remove_data("Notification_token");

export const logout = () => {
  localStore.remove_all();
  return true;
};

export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
};
