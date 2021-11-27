import { useQuery } from "react-query";

import { useClient } from "../../../../lib/hooks/useClient";
import { ALL_SETTINGS } from "../../../../lib/constants";

export const useSettings = ({ uid }) => {
  const client = useClient({ uid });

  return useQuery([ALL_SETTINGS, uid], async () => {
    const data = await client.getSettings();

    return Object.keys(data).reduce((acc, curr) => {
      acc.push({
        key: curr,
        value: data[curr],
      });

      return acc;
    }, []);
  });
};
