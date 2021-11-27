import { useQuery } from "react-query";
import { PAGE_SIZE } from "../constants";
import { useClient } from "../../../../lib/hooks/useClient";
import { INDEXES } from "../../../../lib/constants";

export const useIndex = ({ uid, searchQuery = "", page = 1, selectedSort }) => {
  const client = useClient({ uid });
  const offset = (page - 1) * PAGE_SIZE;

  return useQuery([INDEXES, uid, searchQuery, page, selectedSort], async () => {
    const props = selectedSort
      ? {
          sort: [selectedSort],
          offset,
        }
      : { offset };
    const data = client.search(searchQuery, props);
    return data;
  });
};
