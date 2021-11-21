import React, { useEffect, useState } from "react";

import Auth from "../layouts/Auth.js";
import { useStore } from "../lib/store";
import FeedbackMessage from "../components/FeedbackMessage";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const { login, error, ...rest } = useStore();
  const enbaledRemeberMe = rest.host || rest.key;
  const [host, setHost] = useState(rest.host);
  const [key, setKey] = useState(rest.key);
  const [remember, setRemember] = useState(enbaledRemeberMe);
  console.log(rest);
  const onSubmit = async (e) => {
    e.preventDefault();
    await login(host, key, remember);
  };

  useEffect(() => {
    if (rest.host && rest.key && rest.keys) {
      router.push("/admin/dashboard");
    }
  }, [rest.host, rest.key, rest.keys]);
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={onSubmit} className="mt-6">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="host"
                    >
                      Host
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Host"
                      name="host"
                      value={host}
                      onChange={(e) => setHost(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="api-key"
                    >
                      Master API Key
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>
                  {error && (
                    <FeedbackMessage type="error">
                      Could not communicate with host
                    </FeedbackMessage>
                  )}
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      disabled={!host || !key}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Index.layout = Auth;
