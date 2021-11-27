import { useStore } from "../store";
import { MeiliSearch } from "meilisearch";

export const useClient = ({ uid } = {}) => {
  if (typeof window === "undefined") return {};
  const {
    keys: { private: privateKey },
    host,
  } = useStore();
  const searchClient = new MeiliSearch({
    host,
    apiKey: privateKey,
  });

  if (uid) {
    return searchClient.index(uid);
  }

  return searchClient;
};
