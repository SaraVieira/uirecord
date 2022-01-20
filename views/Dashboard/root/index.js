import Admin from "../../../layouts/Admin";
import { useIndexes } from "./hooks/useIndexes";
import Stats from "./Stats";
import { IndexElDesktop, IndexElMobile } from "./IndexEl";
import Button from "../../../components/Button";
import { openModal } from "../../../lib/modals/wrapper";

export default function Dashboard() {
  const { isLoading, data: indexes } = useIndexes();
  return (
    <>
      <main className="flex-1">
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Home
            </h1>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <Button onClick={() => openModal({ name: "new-index" })}>
              Create a new Index
            </Button>
          </div>
        </div>
        <Stats />
        <div className="mt-10 sm:hidden">
          <div className="px-4 sm:px-6">
            <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
              Indexes
            </h2>
          </div>
          <ul
            role="list"
            className="mt-3 border-t border-gray-200 divide-y divide-gray-100"
          >
            {typeof(indexes) !== 'undefined' && !isLoading &&
              indexes.map((index) => (
                <IndexElMobile key={index.uid} index={index} />
              ))}
          </ul>
        </div>

        <div className="hidden mt-8 sm:block">
          <div className="align-middle inline-block min-w-full border-b border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr className="border-t border-gray-200">
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="lg:pl-2">Project</span>
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last updated
                  </th>
                  <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {typeof(indexes) !== 'undefined' && !isLoading &&
                  indexes.map((index) => (
                    <IndexElDesktop index={index} key={index.uid} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

Dashboard.layout = Admin;
