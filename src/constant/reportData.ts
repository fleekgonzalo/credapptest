const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const reportData = months.map((m, i) =>
  i === 0
    ? {
        asset: 0,
        deposit: 0,
        collateral: 0,
        debt: 0,
        xAxis: m,
      }
    : {
        asset: randomNumber(1000, 5000),
        deposit: randomNumber(1000, 5000),
        collateral: randomNumber(1000, 5000),
        debt: randomNumber(1000, 5000),
        xAxis: m,
      }
);
