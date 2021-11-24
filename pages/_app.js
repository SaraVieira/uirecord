import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import Head from "next/head";
import { useCreateStore, Provider } from "../lib/store";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/index.css";
import ModalWrapper from "../lib/modals/wrapper";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  const createStore = useCreateStore(pageProps.initialZustandState);

  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>UIRecord</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider createStore={createStore}>
          <Layout>
            <Component {...pageProps} />
            <Toaster />
            <ModalWrapper />
            <ReactQueryDevtools initialIsOpen={false} />
          </Layout>
        </Provider>
      </QueryClientProvider>
    </>
  );
}
