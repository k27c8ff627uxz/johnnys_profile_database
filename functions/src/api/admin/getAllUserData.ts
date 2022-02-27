import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const getAllUserData = functions.https.onCall(
  async (params, context): Promise<object> => {
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
