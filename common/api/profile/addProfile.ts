import { Profile } from '../../types/Profile';

export type AddProfileRequest = {
  profile: Profile;
}

export type AddProfileResponse = {
  result: 'success';
  profile: Profile;
  id: string;
} | {
  result: 'unauthenticated';
} | {
  result: 'error';
  errorMessage: string;
}
