import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getCustomClaim } from '../../utils/getCustomClaim';

const getAllUserData = functions.https.onCall(
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

    const resultData = {};

    const usersResult = await admin.auth().listUsers();
    for (const userRecord of usersResult.users) {
      const uid = userRecord.uid;
      resultData[uid] = {
        displayName: userRecord.displayName,
        email: userRecord.email,
        customClaim: userRecord.customClaims,
      };
    }

    return resultData;
  }
);

export default getAllUserData;
