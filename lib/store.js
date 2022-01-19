import { useLayoutEffect } from "react";
import create from "zustand";
import createContext from "zustand/context";
import { HOST_KEY, KEY_KEY, KEY_KEYS } from "./constants";
import {
  removeLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "./utils/localStorage";

let store;

const zustandContext = createContext();
export const Provider = zustandContext.Provider;
export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {}) => {
  return create((set, get) => ({
    ...preloadedState,
    host: getLocalStorage(HOST_KEY) || "",
    key: getLocalStorage(KEY_KEY) || "",
    keys: getLocalStorage(KEY_KEYS) || "",
    isLoggedIn: () => {
      const { host, key, keys } = get();
      return host && key && keys;
    },
    logout: () => {
      removeLocalStorage(KEY_KEY);
      removeLocalStorage(HOST_KEY);
      removeLocalStorage(KEY_KEYS);
      set({ host: "", keys: "", key: "" });
    },
    login: async (host, key) => {
      set({ error: false });
      try {
        const data = await fetch(`${host}/keys`, {
          headers: { "X-Meili-API-Key": key },
        }).then((d) => d.json());

        if (data.errorType === "authentication_error") {
          set({ error: true });
          return;
        }
        const cleanHost = host.endsWith("/") ? host : host + "/";
        set({
          host: cleanHost,
          key,
          keys: data,
        });

        setLocalStorage(KEY_KEY, key);
        setLocalStorage(HOST_KEY, host);
        setLocalStorage(KEY_KEYS, data);
      } catch {
        set({ error: true });
      }
    },
  }));
};

export function useCreateStore(initialState) {
  // For SSR & SSG, always use a new store.
  if (typeof window === "undefined") {
    return () => initializeStore(initialState);
  }

  // For CSR, always re-use same store.
  store = store ?? initializeStore(initialState);
  // And if initialState changes, then merge states in the next render cycle.
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (initialState && store) {
      store.setState({
        ...store.getState(),
        ...initialState,
      });
    }
  }, [initialState]);

  return () => store;
}
