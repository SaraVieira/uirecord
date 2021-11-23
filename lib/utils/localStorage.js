export const getLocalStorage = (key) =>
  typeof window !== "undefined" && JSON.parse(window.localStorage.getItem(key));
export const setLocalStorage = (key, value) =>
  typeof window !== "undefined" &&
  window.localStorage.setItem(key, JSON.stringify(value));
export const removeLocalStorage = (key) =>
  typeof window !== "undefined" && window.localStorage.removeItem(key);
