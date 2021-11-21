import { useStore } from "../../../../lib/store";
import { useQuery } from "react-query";
import axios from "axios";

const getIndexes = async (host, privateKey) => {
  const { data } = await axios.get(`${host}/indexes`, {
    headers: { "X-Meili-API-Key": privateKey },
  });
  return data;
};

export const useIndexes = () => {
  const {
    keys: { private: privateKey },
    host,
  } = useStore();
  return useQuery("indexes", () => getIndexes(host, privateKey));
};
