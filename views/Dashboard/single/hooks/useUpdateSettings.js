import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useInfo } from "../../../../lib/hooks/useInfo";
import { ALL_SETTINGS } from "../../../../lib/constants";

export const useUpdateSettings = ({ uid }) => {
  const queryClient = useQueryClient();
  const { headers, host } = useInfo();
  return useMutation(
    (toUpdateObj) => {
      console.log(toUpdateObj);
      return axios.post(`${host}indexes/${uid}/settings`, toUpdateObj, {
        headers,
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries([ALL_SETTINGS, uid]),
    }
  );
};
