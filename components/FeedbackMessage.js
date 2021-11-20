/* This example requires Tailwind CSS v2.0+ */
import {
  CheckCircleIcon,
  ExclamationIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

const types = {
  success: {
    bg: "bg-green-50",
    text: "text-green-800",
    Icon: CheckCircleIcon,
    iconBg: "text-green-400",
  },
  warning: {
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    Icon: ExclamationIcon,
    iconBg: "text-yellow-400",
  },
  error: {
    bg: "bg-red-50",
    text: "text-red-800",
    Icon: XCircleIcon,
    iconBg: "text-red-400",
  },
};

export default function FeedbackMessage({ children, type }) {
  const { bg, text, Icon, iconBg } = types[type];
  return (
    <div className={`rounded-md ${bg} p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${iconBg}`} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${text}`}>{children}</p>
        </div>
      </div>
    </div>
  );
}
