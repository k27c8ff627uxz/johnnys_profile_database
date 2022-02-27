import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const setAllUserData = functions.https.onCall(
  async (params, context): Promise<boolean> => {
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
