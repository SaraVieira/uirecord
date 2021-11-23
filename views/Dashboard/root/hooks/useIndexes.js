import { useQuery } from "react-query";
import axios from "axios";
import { INDEXES } from "../../../../lib/constants";
import { useInfo } from "../../../../lib/hooks/useInfo";

export const useIndexes = () => {
  const { host, headers } = useInfo();

  const getIndexes = async () => {
    const { data } = await axios.get(`${host}/indexes`, {
      headers,
    });
    return data;
  };

  return useQuery(INDEXES, getIndexes);
};
