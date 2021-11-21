import { useQuery } from "react-query";
import axios from "axios";
import { PAGE_SIZE } from "../constants";
import { useInfo } from "../../../../lib/hooks/useInfo";

export const useIndex = ({ uid, searchQuery = "", page = 1 }) => {
  const { key, host } = useInfo();
  const getIndex = async () => {
    const offset = (page - 1) * PAGE_SIZE;
    const { data } = await axios.get(
      `${host}/indexes/${uid}/search?q=${searchQuery}&offset=${offset}`,
      {
        headers: { "X-Meili-API-Key": key },
      }
    );
    return data;
  };

  return useQuery(["indexes", uid, searchQuery, page], getIndex);
};
