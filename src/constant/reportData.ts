const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
export const months = [
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

export const reportData = months.map((m, i) => {
  return {
    asset: randomNumber(-5000, 5000),
    deposit: randomNumber(1000, 5000),
    collateral: randomNumber(1000, 5000),
    debt: randomNumber(1000, 5000),
    xAxis: m,
  };
});
