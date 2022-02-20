import { Profile } from '../../types/Profile';

export type UpdateProfileRequest = {
  id: string;
  profile: Profile;
}

export type UpdateProfileResponse = {
  result: 'success';
  profile: Profile;
  id: string;
} | {
  result: 'error';
  errorMessage: string;
}
