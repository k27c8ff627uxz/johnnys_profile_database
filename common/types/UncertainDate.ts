
export type UncertainDate = {
  type: 'exact',
  year: number,
  month: number,
  day: number
} | {
  type: 'year_month_only'
  year: number,
  month: number,
} | {
  type: 'year_only'
  year: number,
} | {
  type: 'unknown',
};
