export const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export function getPronouns(guest) {
  if (guest?.is_plus_one) {
    return {
      subject: "they",
      object: "them",
      possessive: "their",
    };
  }

  return {
    subject: "you",
    object: "you",
    possessive: "your",
  };
}