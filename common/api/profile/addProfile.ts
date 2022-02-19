import { Profile } from '../../types/Profile';

export type AddProfileRequest = {
  profile: Profile;
}

export type AddProfileResponse = {
  result: 'success';
  profile: Profile;
  id: string;
} | {
  result: 'error';
  errorMessage: string;
}
