import { Profile } from 'common/types/Profile';
import { convertToBloodType } from 'utils/functions/convertBloodType';
import { RowItem } from './types';

export function convertToRowItem(id: string, profile: Profile): RowItem {
  return {
    id,
    name: profile.name,
    furigana: profile.furigana,
    bloodType: convertToBloodType(profile.bloodType),
    dateOfBirth: new Date(profile.dateOfBirth),
    enter: profile.enter,
    retire: profile.retire,
  };
}
