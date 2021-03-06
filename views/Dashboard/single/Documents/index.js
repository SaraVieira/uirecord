import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Button from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import Loader from "../../../../components/Loader";
import { openModal } from "../../../../lib/modals/wrapper";
import { PAGE_SIZE } from "../constants";
import { useIndex } from "../hooks/useIndex";
import { useSortableAttributes } from "../hooks/useSortableAttributes";
import Pagination from "../Pagination";
import Empty from "./Empty";

const Documents = () => {
  const {
    query: { uid },
  } = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState();
  const { data, isLoading } = useIndex({
    uid,
    searchQuery,
    page,
    selectedSort,
  });
  const [keys, setKeys] = useState([]);

  const { data: sortable } = useSortableAttributes({ uid });
  const documents = data?.hits || [];
  const availablePages = useMemo(
    () => Math.ceil(data?.nbHits / PAGE_SIZE),
    [documents]
  );

  useEffect(() => {
    if (documents?.length) {
      setKeys(Object.keys(documents[0]));
    }

    if (documents && !documents.length) {
      setKeys([]);
    }
  }, [documents]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 mb-5">
        <div style={{ width: 400 }} className="flex gap-4">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            hiddenLabel
            placeholder="Search"
            type="search"
            name="search"
            id="search"
            label="search"
          />
          <div style={{ width: 200 }}>
            {sortable && sortable.length ? (
              <>
                <label
                  htmlFor="sort"
                  className="block text-sm font-medium text-gray-700 sr-only"
                >
                  Sort By
                </label>
                <select
                  id="sort"
                  name="sort"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                >
                  <option value="">Sort By</option>
                  {sortable?.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </>
            ) : null}
          </div>
        </div>

        <Button onClick={() => openModal({ name: "add-records" })}>
          Add Documents
        </Button>
      </div>
      <div className="flex flex-col w-full">
        {isLoading && <Loader />}
        {!isLoading && documents && !documents.length && <Empty />}
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
                    <th
                      scope="col"
                      className="sr-only px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((document, documentIdx) => (
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
                          {typeof value === "object"
                            ? JSON.stringify(value)
                            : value}
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                        <Button
                          type="danger"
                          onClick={() =>
                            openModal({
                              name: "delete-document",
                              params: { id: document.id, uid },
                            })
                          }
                        >
                          Remove
                        </Button>
                      </td>
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
