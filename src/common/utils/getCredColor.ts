export enum Rating {
  Excellent = "Excellent",
  Good = "Good",
  Fair = "Fair",
  Bad = "Bad",
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
    default:
      throw new Error("Invalid rating");
  }
};

export default getCredColor;
