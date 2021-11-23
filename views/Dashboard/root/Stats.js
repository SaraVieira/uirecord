import { format } from "date-fns";
import { useMemo } from "react";
import { formatBytes } from "../../../lib/utils/formatBytes";
import { useStats } from "./hooks/useStats";

const Stats = () => {
  const { isLoading, data } = useStats();
  const stats = useMemo(
    () => [
      {
        label: " Database Size",
        value: formatBytes(data.databaseSize),
      },
      {
        label: "Indexes",
        value: Object.keys(data.indexes).length,
      },
      {
        label: "Last Update",
        value: format(new Date(data.lastUpdate), "MM/dd/yyyy"),
      },
    ],
    [data]
  );
  return (
    <div className="px-4 mt-6 sm:px-6 lg:px-8">
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
        Stats
      </h2>
      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {!isLoading &&
            stats.map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
              >
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
        </dl>
      </div>
    </div>
  );
};

export default Stats;
