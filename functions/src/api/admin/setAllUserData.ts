import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getCustomClaim } from '../../utils/getCustomClaim';

const setAllUserData = functions.https.onCall(
  async (params, context): Promise<boolean> => {

    const uid = context.auth?.uid;
    // 認証チェック(非ログインユーザー)
    if (!uid) {
      functions.logger.error('Not Authenticated User!');
      return false;
    }
  
    // 認証チェック(権限のないユーザー)
    const myCustomClaim = await getCustomClaim(uid);
    if (!myCustomClaim.role.admin) {
      functions.logger.error('Not User Manager Account!');
      return false;
    }

    try {
      const data = JSON.parse(params);
      for (const [uid, value] of Object.entries(data)) {
        functions.logger.info(`start setting uid: ${uid}`);
        const customClaim = value['customClaim'];
        await admin.auth().setCustomUserClaims(uid, customClaim);
      }
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }
  }
);

export default setAllUserData;
