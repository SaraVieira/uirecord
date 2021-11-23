import { classNames } from "../../../lib/utils/classnames";
import Link from "next/link";
import { INDEX_TABS, SINGLE_INDEX } from "../../../lib/constants";

export default function Tabs({ uid, tab }) {
  const link = SINGLE_INDEX(uid);
  const tabs = [
    {
      name: "Documents",
      href: `${link}?tab=${INDEX_TABS[0]}`,
      current: !tab || tab === INDEX_TABS[0],
    },
    {
      name: "Settings",
      href: `${link}?tab=${INDEX_TABS[1]}`,
      current: tab === INDEX_TABS[1],
    },
  ];

  return (
    <div className="p-5">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link key={tab.name} href={tab.href}>
              <a
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
