import { UncertainDate } from 'common/types/UncertainDate';

export type Profile = {
  name: string;
  dateOfBirth: Date,
  enter: UncertainDate,
  retire?: UncertainDate,
}

export type BirthdayArticle = {
  type: 'birthday';
  name: string;
  year: number;
}

export type EnterdayArticle = {
  type: 'enterday';
  name: string;
  year: number;
}

export type Article = BirthdayArticle | EnterdayArticle;
