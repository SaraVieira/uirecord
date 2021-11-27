import { useQuery } from "react-query";
import { useClient } from "../../../../lib/hooks/useClient";
import { STATS } from "../../../../lib/constants";

export const useStats = () => {
  const client = useClient();

  return useQuery(STATS, async () => {
    const stats = await client.getStats();
    return stats;
  });
};
