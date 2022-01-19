import { useStore } from "../store";
import { MeiliSearch } from "meilisearch";

export const useClient = ({ uid } = {}) => {
  if (typeof window === "undefined") return {};
  const {
    host,
    key,
  } = useStore();
  const searchClient = new MeiliSearch({
    host,
    apiKey: key,
  });

  if (uid) {
    return searchClient.index(uid);
  }

  return searchClient;
};
