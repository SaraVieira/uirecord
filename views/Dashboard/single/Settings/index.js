import { useRouter } from "next/router";
import Button from "../../../../components/Button";
import { openModal } from "../../../../lib/modals/wrapper";
import { useSettings } from "../hooks/useSettings";
import Setting from "./Setting";

const Settings = () => {
  const {
    query: { uid },
  } = useRouter();
  const { data = [] } = useSettings({ uid });
  const extraSettings = [
    {
      label: "Delete",
      onClick: () => openModal({ name: "delete-index", params: { uid } }),
      button: "Delete",
    },
    {
      label: "Reset Index Settings",
      onClick: () => openModal({ name: "reset-settings", params: { uid } }),
      button: "Reset",
    },
  ];
  return (
    <section className="p-5">
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          {data.map((setting) => (
            <Setting setting={setting} key={setting.key} />
          ))}
          {extraSettings.map((setting) => (
            <div
              key={setting.label}
              className="py-4 sm:grid sm:py-5 sm:grid-cols-2 sm:gap-4"
            >
              <dt className="text-sm font-medium text-gray-500">
                {setting.label}
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 justify-end">
                <Button onClick={setting.onClick} type="danger">
                  {setting.button}
                </Button>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Settings;
