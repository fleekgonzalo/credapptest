import dynamic from "next/dynamic";
import { useState } from "react";

import { PageHead } from "@/common/components/PageHead";
import AuthenticationForm from "@/modules/Home/CredScoreTopSection/AuthenticationForm";

const CoreLayout = dynamic(
  () => import("@/common/components/CoreLayout/CoreLayout")
);
const HomePage = dynamic(() => import("@/modules/Home"));

const Home = () => {
  //TODO: Remove this logic once testing is complete (this is just for testing experience in prod.)
  const [isAuthorized, setIsAuthorized] = useState(false);

  if (!isAuthorized) {
    return (
      <CoreLayout hideNavItems>
        <AuthenticationForm setIsAuthorized={setIsAuthorized} />
      </CoreLayout>
    );
  }

  return (
    <>
      <PageHead description="Cred Protocol" name="Home" />
      <CoreLayout>
        <HomePage />
      </CoreLayout>
    </>
  );
};

export default Home;
