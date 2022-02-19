
export type UncertainDate = {
  year: number,
  month: number,
  day: number
} | {
  year: number,
  month: number,
} | {
  year: number,
} | 'unknown';
