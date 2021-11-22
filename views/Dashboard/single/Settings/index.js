import { useRouter } from "next/router";
import Button from "../../../../components/Button";
import { openModal } from "../../../../lib/modals/wrapper";
import { useSettings } from "../hooks/useSettings";

const Settings = () => {
  const {
    query: { uid },
  } = useRouter();
  const { data } = useSettings({ uid });
  
  return (
    <section className="p-5">
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          {data?.length &&
            data.map((setting) => (
              <div
                key={setting.key}
                className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"
              >
                <dt className="text-sm font-medium text-gray-500">
                  {setting.key}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="flex-grow font-mono ">{JSON.stringify(setting.value)}</span>
                  <span className="ml-4 flex-shrink-0">
                    <Button type="inline">Update</Button>
                  </span>
                </dd>
              </div>
            ))}
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-2 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Delete Index</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 justify-end">
              <Button
                onClick={() =>
                  openModal({ name: "delete-index", params: { uid } })
                }
                type="danger"
              >
                Delete
              </Button>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default Settings;
