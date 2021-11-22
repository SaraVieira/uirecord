import { useRouter } from "next/dist/client/router";
import Button from "../../../components/Button";

import Admin from "../../../layouts/Admin";
import { openModal } from "../../../lib/modals/wrapper";
import Documents from "./Documents";
import Settings from "./Settings";

import Tabs from "./Tabs";

const Index = () => {
  const {
    query: { uid, tab },
  } = useRouter();

  return (
    <>
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            {uid}
          </h1>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <Button
            onClick={() => openModal({ name: "new-index" })}
          >
            Create a new Index
          </Button>
        </div>
      </div>
      <Tabs uid={uid} tab={tab} />
      {(tab === "documents" || !tab) && <Documents />}
      {(tab === "settings") && <Settings />}
    </>
  );
};
Index.layout = Admin;

export default Index;
