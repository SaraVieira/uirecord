import { classNames } from "../lib/utils/classnames";

const COMMON_CLASSES =
  "w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 sm:w-auto sm:text-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

const getClassnames = (type) => {
  let a = "";
  switch (type) {
    case "secondary":
      a = `${COMMON_CLASSES} border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500`;
      break;
    case `danger`:
      a = `${COMMON_CLASSES} border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`;
      break;
    case `primary`:
      a = `${COMMON_CLASSES} border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500`;
      break;
    case "inline":
      a =
        "bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
      break;
    default:
      a = `${COMMON_CLASSES} border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500`;
      break;
  }

  return a;
};

const Button = ({ type, children, className = "", ...props }) => {
  return (
    <button className={classNames(getClassnames(type), className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
