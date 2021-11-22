import { SearchCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZE } from "../constants";
import { useIndex } from "../hooks/useIndex";
import Pagination from "../Pagination";
import Empty from "./Empty";

const Documents = () => {
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

  useEffect(() => {
    if (documents?.length) {
      setKeys(Object.keys(documents[0]));
    }

    if (documents && !documents.length) {
      setKeys();
    }
  }, [documents]);
  return (
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
        {documents && !documents.length && <Empty />}
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {keys &&
                      keys.map((key) => (
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
                            key={value}
                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>

              <Pagination
                page={page}
                setPage={setPage}
                availablePages={availablePages}
                hits={data?.nbHits}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
