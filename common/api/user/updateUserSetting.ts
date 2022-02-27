import { CustomUserClaim } from '../../types/CustomUserClaim';

export type UpdateUserSettingRequest = {
  uid: string;
  customClaim?: {
    role?: {
      editData: boolean,
      userManage: boolean,
    }
  };
}

export type UpdateUserSettingResponse = {
  result: 'success';
  userRecord: {
    uid: string;
    customClaim?: CustomUserClaim;
  }
} | {
  result: 'unauthenticated';
} | {
  result: 'error';
  errorMessage: string;
}
