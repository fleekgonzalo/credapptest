import dynamic from "next/dynamic";

import { PageHead } from "@/common/components/PageHead";

const CoreLayout = dynamic(
  () => import("@/common/components/CoreLayout/CoreLayout")
);
const HomePage = dynamic(() => import("@/modules/Home"));

const Home = () => {
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
