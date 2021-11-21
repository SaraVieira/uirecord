import { useStore } from "../../../../lib/store";
import { useQuery } from "react-query";
import axios from "axios";

const getStats = async (host, privateKey) => {
  const { data } = await axios.get(`${host}/stats`, {
    headers: { "X-Meili-API-Key": privateKey },
  });
  return data;
};

export const useStats = () => {
  const {
    keys: { private: privateKey },
    host,
  } = useStore();
  return useQuery(["stats"], () => getStats(host, privateKey));
};
