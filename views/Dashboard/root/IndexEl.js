import Link from "next/link";
import { classNames } from "../../../lib/utils/classnames";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { SINGLE_INDEX } from "../../../lib/constants";

export const IndexElDesktop = ({ index }) => (
  <tr>
    <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
      <div className="flex items-center space-x-3 lg:pl-2">
        <div
          className={classNames(
            index.bgColorClass,
            "flex-shrink-0 w-2.5 h-2.5 rounded-full"
          )}
          aria-hidden="true"
        />
        <Link href={SINGLE_INDEX(index.uid)}>
          <a className="truncate hover:text-gray-600">
            <span>{index.uid} </span>
          </a>
        </Link>
      </div>
    </td>

    <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
      <a href="#" className="text-indigo-600 hover:text-indigo-900">
        Edit
      </a>
    </td>
  </tr>
);

export const IndexElMobile = ({ index }) => (
  <li>
    <Link href={SINGLE_INDEX(index.uid)}>
      <a className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6">
        <span className="flex items-center truncate space-x-3">
          <span className="font-medium truncate text-sm leading-6">
            {index.uid}
          </span>
        </span>
        <ChevronRightIcon
          className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      </a>
    </Link>
  </li>
);
