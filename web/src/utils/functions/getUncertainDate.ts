import { UncertainDate } from 'common/types/UncertainDate';

export default function getUncertainDate(udate: UncertainDate) {
  switch(udate.type) {
  case 'unknown':
    return '-/-/-';
  case 'year_only':
    return `${udate.year}/-/-`;
  case 'year_month_only':
    return `${udate.year}/${udate.month}/-`;
  case 'exact':
    return `${udate.year}/${udate.month}/${udate.day}`;
  }
}
