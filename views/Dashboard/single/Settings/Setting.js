import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { useUpdateSettings } from "../hooks/useUpdateSettings";
const Setting = ({ setting: { key, value } }) => {
  const {
    query: { uid },
  } = useRouter();
  const [editing, setEditing] = useState(false);
  const [editedValue, setValue] = useState(JSON.stringify(value));

  const { mutate: updateSettings } = useUpdateSettings({ uid });

  const onClick = async () => {
    if (!editing) {
      setEditing(true);
      return;
    }

    await updateSettings({ [key]: JSON.parse(editedValue) });
    setEditing(false);
  };
  return (
    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500">{key}</dt>
      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2 items-center">
        {editing ? (
          <Input
            hiddenLabel
            label={key}
            value={editedValue}
            onChange={(e) => setValue(e.target.value)}
            autofocus
          />
        ) : (
          <span className="flex-grow font-mono ">{JSON.stringify(value)}</span>
        )}
        <span className="ml-4 flex-shrink-0">
          <Button type="inline" onClick={onClick}>
            Update
          </Button>
        </span>
      </dd>
    </div>
  );
};

export default Setting;
