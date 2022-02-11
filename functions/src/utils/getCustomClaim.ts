import { convertCustomClaim } from '../common/utils/convertCustomClaim';
import * as admin from 'firebase-admin';

export async function getCustomClaim(uid: string) {
  const record = await admin.auth().getUser(uid);
  return convertCustomClaim(record.customClaims);
}
