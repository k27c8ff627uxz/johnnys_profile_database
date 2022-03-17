import { UncertainDate } from './UncertainDate';

export type Profile = {
  name: string;
  furigana: string;
  dateOfBirth: string;
  bloodType?: string;
  enter: UncertainDate;
  retire?: UncertainDate;
  note: string;
};
