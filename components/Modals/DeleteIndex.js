import { Dialog } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { DASHBOARD_ROUTE, INDEXES } from "../../lib/constants";
import { useClient } from "../../lib/hooks/useClient";
import Button from "../Button";

const useDeleteIndex = () => {
  const queryClient = useQueryClient();
  const client = useClient();
  const router = useRouter();
  return useMutation(({ uid }) => client.deleteIndex(uid), {
    onSuccess: () => {
      queryClient.invalidateQueries(INDEXES);
      toast.success("Your index was deleted successfully");
      router.push(DASHBOARD_ROUTE);
    },
    onError: () => {
      toast.error("There was a problem deleting your index");
    },
  });
};

const DeleteIndex = ({ onCancel, data: { uid } }) => {
  const { mutate: deleteIndexMutation, isLoading } = useDeleteIndex();

  return (
    <>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationIcon
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-lg leading-6 font-medium text-gray-900"
          >
            Delete Index
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this index? All of your data will
              be permanently removed. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
        <Button
          type="danger"
          onClick={() => deleteIndexMutation({ uid })}
          disabled={isLoading}
        >
          Delete
        </Button>
        <Button type="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default DeleteIndex;
