import { useRouter } from "next/router";
import Button from "../../../../components/Button";
import { openModal } from "../../../../lib/modals/wrapper";

const Settings = () => {
  const {
    query: { uid },
  } = useRouter();
  return (
    <section className="p-5">
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">Margot Foster</span>
              <span className="ml-4 flex-shrink-0">
                <Button type="inline">Update</Button>
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Application for
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">Backend Developer</span>
              <span className="ml-4 flex-shrink-0">
                <Button type="inline">Update</Button>
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">margotfoster@example.com</span>
              <span className="ml-4 flex-shrink-0">
                <Button type="inline">Update</Button>
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Salary expectation
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow"> $120,000</span>
              <span className="ml-4 flex-shrink-0">
                <Button type="inline">Update</Button>
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-2 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Delete Index</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 justify-end">
              <Button
                onClick={() =>
                  openModal({ name: "delete-index", params: { uid } })
                }
                type="danger"
              >
                Delete
              </Button>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default Settings;
