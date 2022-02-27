import { CustomUserClaim } from '../types/CustomUserClaim';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertCustomClaim(claim: {[key: string]: any} | undefined): CustomUserClaim {
  const defaultCustomUserClaim: CustomUserClaim = {
    version: '1.0.0',
    role: {
      editData: false,
      userManage: false,
      admin: false,
    },
  };

  if (claim === undefined) {
    return defaultCustomUserClaim;
  }

  if (claim['version'] !== '1.0.0'){
    return defaultCustomUserClaim;
  }

  return {
    version: '1.0.0',
    role: {
      editData: claim['role']?.editData ?? false,
      userManage: claim['role']?.userManage ?? false,
      admin: claim['role']?.admin ?? false,
    },
  };
}
