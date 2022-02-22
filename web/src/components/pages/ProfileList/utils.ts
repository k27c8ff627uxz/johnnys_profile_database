import { Profile } from 'common/types/Profile';
import { RowItem } from './types';

function convertToBloodType(bloodType: string): 'A' | 'B' | 'O' | 'AB' {
  switch(bloodType) {
  case 'A': return 'A';
  case 'B': return 'B';
  case 'O': return 'O';
  case 'AB': return 'AB';
  default: throw new Error('Invalid Blood Type');
  }
}

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
