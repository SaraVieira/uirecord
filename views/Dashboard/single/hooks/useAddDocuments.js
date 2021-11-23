import { INDEXES } from "../../../../lib/constants";
import { useMutation, useQueryClient } from "react-query";
import { useInfo } from "../../../../lib/hooks/useInfo";
import axios from "axios";

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
        onSuccess();
      },
    }
  );
};