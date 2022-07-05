import Image from "next/image";
import Link from "next/link";

import AreaChart from "@/common/components/AreaChart/AreaChart";
import { Button } from "@/common/components/Button";
import { ChevronLeftIcon } from "@/common/components/CustomIcon";

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const data = [
  { value: randomNumber(1000, 5000), xAxis: "Jan" },
  { value: randomNumber(1000, 5000), xAxis: "Feb" },
  { value: randomNumber(1000, 5000), xAxis: "Mar" },
  { value: randomNumber(1000, 5000), xAxis: "Apr" },
  { value: randomNumber(1000, 5000), xAxis: "May" },
  { value: randomNumber(1000, 5000), xAxis: "June" },
  { value: randomNumber(1000, 5000), xAxis: "Jul" },
  { value: randomNumber(1000, 5000), xAxis: "Aug" },
  { value: randomNumber(1000, 5000), xAxis: "Sep" },
  { value: randomNumber(1000, 5000), xAxis: "Oct" },
  { value: randomNumber(1000, 5000), xAxis: "Nov" },
  { value: randomNumber(1000, 5000), xAxis: "Dec" },
];
const IMAGE_SIZE = 638;
const ReportPage = () => {
  return (
    <div className="py-12 md:py-16 px-5 max-w-[1130px] mx-auto">
      <Link href="/">
        <Button className="text-sm font-medium leading-[14px] pt-0 pb-0 pl-0 pr-0 mb-8">
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 flex items-center justify-center">
              <ChevronLeftIcon />
            </div>
            Back to credit score
          </div>
        </Button>
      </Link>
      <div>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold leading-[20px]">Cred Report</h2>
            <span className="tracking-[0.16em] text-sm text-cred-light-blue">
              <span className="font-medium">powered by</span>
              <span className="font-extrabold"> Cred Protocol</span>
            </span>
          </div>
          <div>
            <Button
              className="text-sm font-semibold pt-[8.5px] pb-[8.5px] px-3 leading-[15px] tracking-[0.02em] rounded-[6px]"
              variant="primary"
            >
              DOWNLOAD YOUR REPORT
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          alt="report"
          height={IMAGE_SIZE}
          src="/image/report_circle.png"
          width={IMAGE_SIZE}
        ></Image>
      </div>
      <div className="min-h-[80vh]">
        <AreaChart data={data} height="99%" width="99%" />
      </div>
    </div>
  );
};

export default ReportPage;
