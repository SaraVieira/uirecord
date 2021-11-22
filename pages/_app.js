import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

import Head from "next/head";

import { useCreateStore, Provider } from "../lib/store";
import { ReactQueryDevtools } from "react-query/devtools";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/index.css";
import ModalWrapper from "../lib/modals/wrapper";
const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  const createStore = useCreateStore(pageProps.initialZustandState);

  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>MeiliSearch GUI</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider createStore={createStore}>
          <Layout>
            <Component {...pageProps} />
            <ModalWrapper />
            <ReactQueryDevtools initialIsOpen={true} />
          </Layout>
        </Provider>
      </QueryClientProvider>
    </React.Fragment>
  );
}
