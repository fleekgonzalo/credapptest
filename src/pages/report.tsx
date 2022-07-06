import dynamic from "next/dynamic";

import { PageHead } from "@/common/components/PageHead";

const ReportPage = dynamic(() => import("@/modules/Report"), {
  loading: () => <div className="h-full bg-cred-blue" />,
});

const Report = () => {
  return (
    <>
      <PageHead description="Cred Protocol" name="Report" />
      <ReportPage />
    </>
  );
};

export default Report;
