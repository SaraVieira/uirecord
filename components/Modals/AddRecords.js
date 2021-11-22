import { Dialog } from "@headlessui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAddDocuments } from "../../views/Dashboard/single/hooks/useAddDocuments";

import Button from "../Button";

const Ace = dynamic(() => import("../Ace"), { ssr: false });

const AddRecords = ({ onCancel }) => {
  const {
    query: { uid },
  } = useRouter();
  const [value, setValue] = useState("");

  const { mutate: addRecords, isLoading } = useAddDocuments({
    uid,
    onSuccess: onCancel,
  });

  return (
    <div>
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-lg leading-6 font-medium text-gray-900"
          >
            Add records to {uid}
          </Dialog.Title>
          <div className="mt-5">
            <Ace
              onChange={setValue}
              width="440px"
              height="200px"
              focus
              wrapEnabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
        <Button onClick={() => addRecords(value)} disabled={isLoading}>
          Update
        </Button>
        <Button type="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddRecords;
