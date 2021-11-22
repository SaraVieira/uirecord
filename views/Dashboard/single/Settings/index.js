import { useRouter } from "next/router";
import Button from "../../../../components/Button";
import { openModal } from "../../../../lib/modals/wrapper";
import { useSettings } from "../hooks/useSettings";
import Setting from "./Setting";

const Settings = () => {
  const {
    query: { uid },
  } = useRouter();
  const { data } = useSettings({ uid });
  console.log(data);
  return (
    <section className="p-5">
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          {data?.length &&
            data.map((setting) => (
              <Setting setting={setting} key={setting.key} />
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
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-2 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Reset Index Settings
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 justify-end">
              <Button
                onClick={() =>
                  openModal({ name: "reset-settings", params: { uid } })
                }
                type="danger"
              >
                Reset
              </Button>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default Settings;
