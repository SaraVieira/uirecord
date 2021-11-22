import { useQuery } from "react-query";
import axios from "axios";
import { PAGE_SIZE } from "../constants";
import { useInfo } from "../../../../lib/hooks/useInfo";
import { INDEXES } from "../../../../lib/constants";

export const useIndex = ({ uid, searchQuery = "", page = 1 }) => {
  const { headers, host } = useInfo();
  const getIndex = async () => {
    const offset = (page - 1) * PAGE_SIZE;
    const { data } = await axios.get(
      `${host}/indexes/${uid}/search?q=${searchQuery}&offset=${offset}`,
      {
        headers,
      }
    );
    return data;
  };

  return useQuery([INDEXES, uid, searchQuery, page], getIndex);
};
