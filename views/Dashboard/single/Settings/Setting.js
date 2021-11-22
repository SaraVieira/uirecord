import Button from "../../../../components/Button";
import { openModal } from "../../../../lib/modals/wrapper";
const Setting = ({ setting: { key, value } }) => {
  const onClick = async () => {
    openModal({
      name: "update-setting",
      params: { key, value },
    });
  };
  return (
    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500">{key}</dt>
      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2 items-center">
        <span className="flex-grow font-mono ">{JSON.stringify(value)}</span>
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
