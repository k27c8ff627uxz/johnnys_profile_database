
export type UncertainDate = {
  year: number,
  month: number,
  day: number
} | {
  year: number,
  month: number,
} | {
  year: number,
// eslint-disable-next-line @typescript-eslint/ban-types
} | { };

export type Profile = {
  name: string;
  furigana: string;
  dateOfBirth: string;
  bloodType: string;
  enter: UncertainDate;
  retire?: UncertainDate;
};
