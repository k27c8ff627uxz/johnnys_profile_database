import { Profile, UncertainDate } from 'common/types/Profile';
import { RowItem } from './types';

export function getUncertainDate(udate: UncertainDate) {
  if (!('year' in udate)) {
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

export function convertToRowItem(id: string, profile: Profile): RowItem {
  return {
    id,
    name: profile.name,
    furigana: profile.furigana,
    bloodType: profile.bloodType,
    dateOfBirth: new Date(profile.dateOfBirth),
    enter: profile.enter,
    retire: profile.retire,
  };
}
