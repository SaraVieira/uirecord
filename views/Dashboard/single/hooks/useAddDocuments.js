import { INDEXES } from "../../../../lib/constants";
import { useMutation, useQueryClient } from "react-query";
import { useInfo } from "../../../../lib/hooks/useInfo";
import axios from "axios";
import toast from "react-hot-toast";

export const useAddDocuments = ({ uid, onSuccess }) => {
  const queryClient = useQueryClient();
  const { headers, host } = useInfo();
  return useMutation(
    (toUpdateObj) => {
      return axios.put(`${host}indexes/${uid}/documents`, toUpdateObj, {
        headers,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([INDEXES, uid, "", 1]);
        toast.success("Your records were inserted successfully");
        onSuccess();
      },
      onError: () => {
        toast.error("There was a problem inserting your records");
      },
    }
  );
};
