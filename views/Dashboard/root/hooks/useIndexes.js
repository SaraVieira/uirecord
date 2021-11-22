import { useQuery } from "react-query";
import axios from "axios";
import { INDEXES } from "../../../../lib/constants";
import { useInfo } from "../../../../lib/hooks/useInfo";

const getIndexes = async (host, headers) => {
  const { data } = await axios.get(`${host}/indexes`, {
    headers,
  });
  return data;
};

export const useIndexes = () => {
  const { host, headers } = useInfo();
  return useQuery(INDEXES, () => getIndexes(host, headers));
};
