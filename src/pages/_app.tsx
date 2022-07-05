import "@/styles/main.scss";

import Head from "next/head";
import { Toaster } from "react-hot-toast";

import { AuthWrapper } from "@/common/components/AuthWrapper.tsx";
import { CoreLayout } from "@/common/components/CoreLayout";
import { PageHead } from "@/common/components/PageHead";

export const App = ({ Component, pageProps }) => {
  return (
    <>
      <PageHead>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
      </PageHead>
      {/* //TODO: Remove this wrapper (AuthWrapper) once testing is complete (this is just for testing experience in prod.) */}
      <AuthWrapper>
        <CoreLayout>
          <Component {...pageProps} />
        </CoreLayout>
      </AuthWrapper>
      <Toaster position="top-right" />
    </>
  );
};

export default App;
