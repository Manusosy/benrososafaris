export type DirectAnswer = {
  answer: string;
  question: string;
};

export function normalizeDirectAnswers(value: unknown): DirectAnswer[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => ({
      question: String((item as DirectAnswer).question || '').trim(),
      answer: String((item as DirectAnswer).answer || '').trim()
    }))
    .filter((item) => item.question && item.answer);
}
