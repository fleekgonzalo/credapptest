export enum Rating {
  Excellent = "Excellent",
  Good = "Good",
  Fair = "Fair",
  Bad = "Bad",
  Poor = "Poor",
  Low = "Low",
}

const getCredColor = (rating: Rating) => {
  switch (rating) {
    case Rating.Excellent:
      return "green";
    case Rating.Good:
      return "yellow";
    case Rating.Fair:
      return "orange";
    case Rating.Bad:
      return "red";
    case Rating.Poor:
      return "red";
    case Rating.Low:
      return "red";
    default:
      return "red";
  }
};

export default getCredColor;
