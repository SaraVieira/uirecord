import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useInfo } from "../../../../lib/hooks/useInfo";
import { ALL_SETTINGS } from "../../../../lib/constants";
import toast from "react-hot-toast";

export const useUpdateSettings = ({ uid, onSuccess }) => {
  const queryClient = useQueryClient();
  const { headers, host } = useInfo();
  return useMutation(
    (toUpdateObj) =>
      axios.post(`${host}/indexes/${uid}/settings`, toUpdateObj, {
        headers,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ALL_SETTINGS, uid]);
        toast.success("Your settings were updated successfully");
        onSuccess();
      },
      onError: () => {
        toast.error("There was a problem updating your settings");
      },
    }
  );
};
