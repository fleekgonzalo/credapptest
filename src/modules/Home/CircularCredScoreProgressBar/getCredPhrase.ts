const getCredPhrase = (percent: number) => {
  let phrase: string;
  if (percent > 0.8) {
    phrase = "excellent";
    return phrase;
  }

  if (percent > 0.6) {
    phrase = "good";
    return phrase;
  }

  if (percent > 0.4) {
    phrase = "fair";
    return phrase;
  }

  if (percent < 0.4) {
    phrase = "bad";
    return phrase;
  }
};

export default getCredPhrase;
