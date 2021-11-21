import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { PAGE_SIZE } from "./constants";

const getActiveClassName = (active) =>
  active
    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium";

const Pagination = ({ availablePages, page, setPage, hits }) => {
  if (!availablePages || availablePages === 1) return null;
  const arrayOfPages =
    availablePages && Array.apply(null, Array(availablePages)).map((_, i) => i);

  return (
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
            <span className="font-medium">{(page - 1) * PAGE_SIZE || 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {page * PAGE_SIZE > hits ? hits : page * PAGE_SIZE}
            </span>{" "}
            of <span className="font-medium">{hits}</span> results
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
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
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
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
