import { compareAsc, parse } from "date-fns";

import { monthMapping } from "@/constant/reportData";
import { HistoryResult } from "@/types/api";

export const parseNum = (num: string) => {
  return isNaN(parseFloat(num)) ? null : parseFloat(num);
};

type ChartData = {
  date: string;
  debt: number;
  deposit: number;
  collateral: number;
  asset: number;
};

export const generateHistoryData = (data: HistoryResult) => {
  if (!data) {
    return null;
  }
  const isAllNull = data.every((entry) => entry.date === null);

  if (isAllNull) {
    return null;
  }
  const dataSortedByDate = data.sort((a, b) => {
    const dayA = parse(a.date, "yyyy-MM-dd", new Date());
    const dayB = parse(b.date, "yyyy-MM-dd", new Date());
    return compareAsc(dayA, dayB);
  });

  let monthDict: { [key: string]: ChartData } = dataSortedByDate.reduce(
    (dict, dayData) => {
      const month = dayData.date.slice(0, 7);
      dict[month] = {
        asset: parseNum(dayData.asset),
        deposit: parseNum(dayData.deposit),
        collateral: parseNum(dayData.collateral),
        debt: parseNum(dayData.debt),
        date: monthMapping[month.slice(5)],
      };
      return dict;
    },
    {}
  );
  const months = Object.keys(monthDict).sort((a, b) => {
    const monthA = parse(a, "yyyy-MM", new Date());
    const monthB = parse(b, "yyyy-MM", new Date());
    return compareAsc(monthA, monthB);
  });

  return months.map((month) => monthDict[month]);
};
