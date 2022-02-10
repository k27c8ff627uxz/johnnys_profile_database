import { CustomUserClaim } from '../types/CustomUserClaim';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertCustomClaim(claim: {[key: string]: any} | undefined): CustomUserClaim {
  const defaultCustomUserClaim: CustomUserClaim = { version: '0.0.0' };
  if (claim === undefined) {
    return defaultCustomUserClaim;
  }

  if (claim['version'] !== '1.0.0'){
    return defaultCustomUserClaim;
  }

  return {
    version: '1.0.0',
    editData: claim['editData'] ?? false,
    userManage: claim['userManage'] ?? false,
  };
}
