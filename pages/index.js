import React, { useEffect, useState } from "react";

import Auth from "../layouts/Auth.js";
import { useStore } from "../lib/store";
import FeedbackMessage from "../components/FeedbackMessage";
import { useRouter } from "next/router";
import { DASHBOARD_ROUTE } from "../lib/constants.js";

export default function Index() {
  const router = useRouter();
  const { login, error, ...rest } = useStore();

  const [host, setHost] = useState(rest.host);
  const [key, setKey] = useState(rest.key);

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(host, key);
  };

  useEffect(() => {
    if (rest.host && rest.key && rest.keys) {
      router.push(DASHBOARD_ROUTE);
    }
  }, [rest.host, rest.key, rest.keys]);

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <>
          <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form
                  onSubmit={onSubmit}
                  className="space-y-6"
                  action="#"
                  method="POST"
                >
                  <div>
                    <label
                      htmlFor="host"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Host
                    </label>
                    <div className="mt-1">
                      <input
                        id="host"
                        name="host"
                        type="text"
                        autoComplete="host"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={host}
                        onChange={(e) => setHost(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="masterKey"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Master API Key
                    </label>
                    <div className="mt-1">
                      <input
                        id="masterKey"
                        name="masterKey"
                        type="password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                      />
                    </div>
                  </div>
                  {error && (
                    <FeedbackMessage type="error">
                      Could not communicate with host
                    </FeedbackMessage>
                  )}
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={!host || !key}
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}

Index.layout = Auth;
