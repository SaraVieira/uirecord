import { useQuery } from "react-query";
import { INDEXES } from "../../../../lib/constants";
import { useClient } from "../../../../lib/hooks/useClient";

export const useIndexes = () => {
  const client = useClient();

  return useQuery(INDEXES, async () => {
    const indexes = await client.getIndexes();
    return indexes;
  });
};
