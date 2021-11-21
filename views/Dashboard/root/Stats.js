import { format } from "date-fns";
import { formatBytes } from "../../../lib/utils/formatBytes";
import { useStats } from "./hooks/useStats";

const Stats = () => {
  const { isLoading, data: stats } = useStats();
  return (
    <div className="px-4 mt-6 sm:px-6 lg:px-8">
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
        Stats
      </h2>
      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {!isLoading && (
            <>
              <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Database Size
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {formatBytes(stats.databaseSize)}
                </dd>
              </div>
              <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Indexes
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {Object.keys(stats.indexes).length}
                </dd>
              </div>
              <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Last Update
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {format(new Date(stats.lastUpdate), "MM/dd/yyyy")}
                </dd>
              </div>
            </>
          )}
        </dl>
      </div>
    </div>
  );
};

export default Stats;
