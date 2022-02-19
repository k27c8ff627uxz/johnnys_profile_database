
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

export type Profile = {
  name: string;
  furigana: string;
  dateOfBirth: string;
  bloodType: string;
  enter: UncertainDate;
  retire?: UncertainDate;
};
