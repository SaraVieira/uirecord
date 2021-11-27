import { useMutation, useQueryClient } from "react-query";
import { useClient } from "../../../../lib/hooks/useClient";
import { ALL_SETTINGS } from "../../../../lib/constants";
import toast from "react-hot-toast";

export const useUpdateSettings = ({ uid, onSuccess }) => {
  const queryClient = useQueryClient();
  const client = useClient({ uid });
  return useMutation((toUpdateObj) => client.updateSettings(toUpdateObj), {
    onSuccess: () => {
      queryClient.invalidateQueries([ALL_SETTINGS, uid]);
      toast.success("Your settings were updated successfully");
      onSuccess();
    },
    onError: () => {
      toast.error("There was a problem updating your settings");
    },
  });
};
