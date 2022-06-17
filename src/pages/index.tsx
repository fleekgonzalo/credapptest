import dynamic from "next/dynamic";

import { PageHead } from "@/common/components/PageHead";

const CoreLayout = dynamic(
  () => import("@/common/components/CoreLayout/CoreLayout"),
  {
    loading: () => <div className="h-full bg-cred-blue" />,
  }
);
const HomePage = dynamic(() => import("@/modules/Home"), {
  loading: () => <div className="h-full bg-cred-blue" />,
});

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
