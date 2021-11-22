import { Dialog } from "@headlessui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";

import { useUpdateSettings } from "../../views/Dashboard/single/hooks/useUpdateSettings";
import Button from "../Button";

const Ace = dynamic(() => import("../Ace"), { ssr: false });

const UpdateSetting = ({ onCancel, data: { key, value } }) => {
  const {
    query: { uid },
  } = useRouter();
  const [editedValue, setValue] = useState(JSON.stringify(value));

  const { mutate: updateSettings, isLoading } = useUpdateSettings({
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
            Update Setting ({key})
          </Dialog.Title>
          <div className="mt-5">
            <Ace
              defaultValue={JSON.stringify(value)}
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
        <Button
          onClick={() => updateSettings({ [key]: JSON.parse(editedValue) })}
          disabled={isLoading}
        >
          Update
        </Button>
        <Button type="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default UpdateSetting;
