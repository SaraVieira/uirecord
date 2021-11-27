import { INDEXES } from "../../../../lib/constants";
import { useMutation, useQueryClient } from "react-query";
import { useClient } from "../../../../lib/hooks/useClient";
import toast from "react-hot-toast";

export const useAddDocuments = ({ uid, onSuccess }) => {
  const queryClient = useQueryClient();
  const client = useClient({ uid });
  return useMutation(
    (toUpdateObj) => {
      const parsed = JSON.parse(toUpdateObj);
      const toSend = Array.isArray(parsed) ? parsed : [parsed];
      return client.updateDocuments(toSend);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([INDEXES, uid]);
        toast.success("Your records were inserted successfully");
        onSuccess();
      },
      onError: () => {
        toast.error("There was a problem inserting your records");
      },
    }
  );
};
