export function updateRating(
  userRating: number,
  questionDifficulty: number,
  isCorrect: boolean
): number {
  const K = 32;
  const expected = 1 / (1 + Math.pow(10, (questionDifficulty - userRating) / 400));
  const actual = isCorrect ? 1 : 0;
  const newRating = Math.round(userRating + K * (actual - expected));

  // clamp to safe range
  return Math.max(800, Math.min(newRating, 2500));
}
