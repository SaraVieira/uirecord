import { useStore } from "../../../../lib/store";
import { useQuery } from "react-query";
import axios from "axios";
import { PAGE_SIZE } from "../constants";

const getIndex = async (host, privateKey, uid, searchQuery, page) => {
  const offset = (page - 1) * PAGE_SIZE;
  const { data } = await axios.get(
    `${host}/indexes/${uid}/search?q=${searchQuery}&offset=${offset}`,
    {
      headers: { "X-Meili-API-Key": privateKey },
    }
  );
  console.log(data);
  return data;
};

export const useIndex = ({ uid, searchQuery = "", page = 1 }) => {
  const {
    keys: { private: privateKey },
    host,
  } = useStore();
  return useQuery(["indexes", uid, searchQuery, page], () =>
    getIndex(host, privateKey, uid, searchQuery, page)
  );
};
