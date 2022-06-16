import "@/styles/main.scss";

import Head from "next/head";
import { Toaster } from "react-hot-toast";

import { PageHead } from "@/common/components/PageHead";

export const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
        <PageHead />
      </Head>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </>
  );
};

export default App;
