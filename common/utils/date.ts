import { UncertainDate } from '../types/UncertainDate';

export function dateToString(d: Date, separator = '/') {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${year}${separator}${month}${separator}${day}`;
}

export function dateToUncertainDate(d: Date): UncertainDate {
  return {
    type: 'exact',
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
  };
}
