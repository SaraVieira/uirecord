import { useQuery } from "react-query";
import { useClient } from "../../../../lib/hooks/useClient";

export const useSortableAttributes = ({ uid }) => {
  const client = useClient({ uid });
  return useQuery("sortable", async () => {
    const data = await client.getSortableAttributes();
    return [
      ...data.map((d) => `${d}:asc`),
      ...data.map((d) => `${d}:desc`),
    ].sort();
  });
};
