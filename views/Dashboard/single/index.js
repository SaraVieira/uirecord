import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/dist/client/router";
import { useEffect, useMemo, useState } from "react";
import Admin from "../../../layouts/Admin";
import { PAGE_SIZE } from "./constants";
import { useIndex } from "./hooks/useIndex";
import Tabs from "./Tabs";

const Index = () => {
  const {
    query: { uid },
  } = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useIndex({ uid, searchQuery, page });
  const [keys, setKeys] = useState([]);
  const documents = data?.hits;
  const availablePages = useMemo(
    () => Math.ceil(data?.nbHits / PAGE_SIZE),
    [documents]
  );
  console.log(availablePages);
  useEffect(() => {
    if (documents?.length) {
      setKeys(Object.keys(documents[0]));
    }
  }, [documents]);

  const arrayOfPages =
    availablePages && Array.apply(null, Array(availablePages)).map((_, i) => i);

  const getActiveClassName = (active) =>
    active
      ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium";

  return (
    <>
      <Tabs />

      <div className="flex flex-col items-end">
        <div style={{ width: 400 }} className="flex-grow m-2">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Search
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="search"
              name="search"
              id="search"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <SearchCircleIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {keys.map((key) => (
                        <th
                          key={key}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading &&
                      documents.map((document, documentIdx) => (
                        <tr
                          key={document.uid}
                          className={
                            documentIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          {Object.values(document).map((value) => (
                            <td
                              key={documentIdx}
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
                {availablePages && (
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Previous
                      </a>
                      <a
                        href="#"
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Next
                      </a>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing{" "}
                          <span className="font-medium">
                            {(page - 1) * PAGE_SIZE || 1}
                          </span>{" "}
                          to{" "}
                          <span className="font-medium">
                            {page * PAGE_SIZE > data.nbHits
                              ? data.nbHits
                              : page * PAGE_SIZE}
                          </span>{" "}
                          of <span className="font-medium">{data.nbHits}</span>{" "}
                          results
                        </p>
                      </div>
                      <div>
                        <nav
                          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                          aria-label="Pagination"
                        >
                          {page !== 1 && (
                            <button
                              onClick={() => setPage(page - 1)}
                              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                              <span className="sr-only">Previous</span>
                              <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          )}
                          {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                          {arrayOfPages.slice(0, 3).length &&
                            arrayOfPages.slice(0, 3).map((i) => (
                              <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={getActiveClassName(i + 1 === page)}
                              >
                                {i + 1}
                              </button>
                            ))}

                          {availablePages > 6 && (
                            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                              ...
                            </span>
                          )}
                          {availablePages > 3 &&
                            arrayOfPages.slice(-3).map((i) => (
                              <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                aria-current="page"
                                className={getActiveClassName(i + 1 === page)}
                              >
                                {i + 1}
                              </button>
                            ))}
                          {page !== availablePages && (
                            <button
                              onClick={() => setPage(page + 1)}
                              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                              <span className="sr-only">Next</span>
                              <ChevronRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          )}
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
Index.layout = Admin;

export default Index;
