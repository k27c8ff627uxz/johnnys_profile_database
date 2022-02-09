import { CustomUserClaim } from 'common/types/CustomUserClaim';

export interface RowItem {
  id: string;
  name: string;
  email: string;
  customClaim: CustomUserClaim;
  verified: boolean;
}
