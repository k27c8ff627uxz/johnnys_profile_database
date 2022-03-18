import { UncertainDate } from 'common/types/UncertainDate';

export type Profile = {
  name: string;
  dateOfBirth: Date,
  enter: UncertainDate,
  retire?: UncertainDate,
}

export type Article = {
  type: 'birthday';
  name: string;
  year: number;
} | {
  type: 'enterday';
  name: string;
  year: number;
}
