import { Profile } from '../../types/Profile';

export type GetProfileListResponse = {
  result: 'success';
  profileList: {[id: string]: Profile};
} | {
  result: 'error';
  errorMessage: string;
}
