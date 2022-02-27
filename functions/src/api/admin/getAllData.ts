import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getCustomClaim } from '../../utils/getCustomClaim';

const getAllData = functions.https.onCall(
  async (params, context): Promise<object> => {
  
    const uid = context.auth?.uid;
    // 認証チェック(非ログインユーザー)
    if (!uid) {
      functions.logger.error('Not Authenticated User!');
      return undefined;
    }
  
    // 認証チェック(権限のないユーザー)
    const myCustomClaim = await getCustomClaim(uid);
    if (!myCustomClaim.role.admin) {
      functions.logger.error('Not User Manager Account!');
      return undefined;
    }

    const ref = admin.database().ref('/');
    const snapshot = await ref.get();

    return snapshot.val();
  }
);

export default getAllData;
