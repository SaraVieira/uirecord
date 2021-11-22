export const Input = ({ label, hiddenLabel, description, ...props }) => {
  return (
    <div className="w-full">
      <label
        className={
          hiddenLabel ? "sr-only" : "block text-sm font-medium text-gray-700"
        }
      >
        {label}
      </label>
      <div className="mt-1 w-full">
        <input
          type="text"
          {...props}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};
