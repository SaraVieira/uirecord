
import { useQuery } from "react-query";
import axios from "axios";
import { useInfo } from "../../../../lib/hooks/useInfo";
import { STATS } from "../../../../lib/constants";

const getStats = async (host, headers) => {
  const { data } = await axios.get(`${host}/stats`, {
    headers,
  });
  return data;
};

export const useStats = () => {
  const { host, headers } = useInfo();
  return useQuery(STATS, () => getStats(host, headers));
};
