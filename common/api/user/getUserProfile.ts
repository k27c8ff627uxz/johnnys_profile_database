import { CustomUserClaim } from '../../types/CustomUserClaim';

export type GetUserProfileRequest = {
  uid?: string;
}

export type GetUserProfileResponse = {
  result: 'success';
  data: {
    uid: string;
    name: string;
    email: string;
    customClaim: CustomUserClaim;
    verified: boolean;
  }[];
} | {
  result: 'notAuthenticated';
} | {
  result: 'error';
  errorMessage: string;
}
