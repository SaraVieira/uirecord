import { useQuery } from "react-query";
import axios from "axios";
import { useInfo } from "../../../../lib/hooks/useInfo";
import { ALL_SETTINGS } from "../../../../lib/constants";

export const useSettings = ({ uid }) => {
  const { headers, host } = useInfo();
  const getIndex = async () => {
    const { data } = await axios.get(`${host}/indexes/${uid}/settings`, {
      headers: headers,
    });
    return Object.keys(data).reduce((acc, curr) => {
      acc.push({
        key: curr,
        value: data[curr],
      });

      return acc;
    }, []);
  };

  return useQuery([ALL_SETTINGS, uid], getIndex);
};
