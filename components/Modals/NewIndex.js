import { Dialog } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { INDEXES } from "../../lib/constants";
import { useInfo } from "../../lib/hooks/useInfo";
import { closeModal } from "../../lib/modals/wrapper";

const useCreateIndex = () => {
  const queryClient = useQueryClient();
  const { headers, host } = useInfo();
  return useMutation(
    ({ uid, primaryKey }) => {
      const values = primaryKey
        ? {
            uid,
            primaryKey,
          }
        : { uid };
      return axios.post(`${host}/indexes`, JSON.stringify(values), {
        headers,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(INDEXES);
        toast.success("Your index was created successfully");
        closeModal();
      },
      onError: () => {
        toast.error("There was a problem creating your index");
      },
    }
  );
};

const NewIndex = ({ onCancel }) => {
  const { mutate: createIndexMutation } = useCreateIndex();
  const formik = useFormik({
    initialValues: {
      index: "",
      primaryKey: "",
    },
    onSubmit: (values) =>
      createIndexMutation({
        uid: values.index,
        primaryKey: values.primaryKey,
      }),
  });

  return (
    <div>
      <div>
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <QuestionMarkCircleIcon
            className="h-6 w-6 text-green-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-lg leading-6 font-medium text-gray-900"
          >
            Create a new Index
          </Dialog.Title>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label
            htmlFor="index"
            className="block text-sm font-medium text-gray-700"
          >
            Index ID
          </label>
          <div className="mt-1">
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.index}
              name="index"
              id="index"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="my amazing index"
              required
            />
          </div>
        </div>
        <div className="mt-3">
          <label
            htmlFor="primaryKey"
            className="block text-sm font-medium text-gray-700"
          >
            Primary Key
          </label>
          <div className="mt-1">
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.primaryKey}
              name="primaryKey"
              id="primaryKey"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="movies_id"
            />
          </div>
        </div>

        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
            disabled={formik.isSubmitting}
          >
            Create
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewIndex;
