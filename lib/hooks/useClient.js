import { useStore } from "../store";
import { MeiliSearch } from "meilisearch";

export const useClient = ({ uid } = {}) => {
  if (typeof window === "undefined") return {};
  const {
    host,
    keys: { private: privateKey },
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
