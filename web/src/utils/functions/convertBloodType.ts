import { BloodType } from 'utils/types';

export function convertToBloodType(bloodType: string): BloodType {
  switch(bloodType) {
  case 'A': return 'A';
  case 'B': return 'B';
  case 'O': return 'O';
  case 'AB': return 'AB';
  default: throw new Error('Invalid Blood Type');
  }
}
