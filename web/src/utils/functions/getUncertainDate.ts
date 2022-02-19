import { UncertainDate } from 'common/types/UncertainDate';

export default function getUncertainDate(udate: UncertainDate) {
  if (udate === 'unknown') {
    return '-/-/-';
  }
  if (!('month' in udate)) {
    return `${udate.year}/-/-`;
  }
  if (!('day' in udate)) {
    return `${udate.year}/${udate.month}/-`;
  }
  return `${udate.year}/${udate.month}/${udate.day}`;
}
