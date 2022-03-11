import { Profile } from 'common/types/Profile';
import { UncertainDate } from 'common/types/UncertainDate';
import { dateToUncertainDate } from 'common/utils/date';
import { convertToBloodType, sortUncertainDate } from 'utils/functions';
import { RowItem } from './types';

export function convertToRowItem(id: string, profile: Profile): RowItem {
  return {
    id,
    name: profile.name,
    furigana: profile.furigana,
    bloodType: profile.bloodType !== undefined ? convertToBloodType(profile.bloodType) : undefined,
    dateOfBirth: new Date(profile.dateOfBirth),
    enter: profile.enter,
    retire: profile.retire,
  };
}

export function calcIsRetireNow(today: Date, retireDate?: UncertainDate) {
  if (retireDate === undefined) {
    return false;
  }

  return sortUncertainDate(
    'desc',
    dateToUncertainDate(today),
    retireDate
  ) < 0;
}
