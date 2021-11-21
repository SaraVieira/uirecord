import { useStore } from "../store";

export const useInfo = () => {
  const {
    keys: { private: privateKey },
    host,
  } = useStore();

  return {
    host,
    key: privateKey,
    headers: { "X-Meili-API-Key": privateKey },
  };
};
