import { useQuery } from "react-query";
import axios from "axios";
import { useInfo } from "../../../../lib/hooks/useInfo";
import { STATS } from "../../../../lib/constants";

export const useStats = () => {
  const { host, headers } = useInfo();

  const getStats = async () => {
    const { data } = await axios.get(`${host}/stats`, {
      headers,
    });
    return data;
  };

  return useQuery(STATS, getStats);
};
