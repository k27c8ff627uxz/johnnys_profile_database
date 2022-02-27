import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CustomUserClaim } from 'common/types/CustomUserClaim';

const fullCustomClaim: CustomUserClaim = {
  version: '1.0.0',
  role: {
    editData: true,
    userManage: true,
  },
};

const attachRolesToAdmin = functions.https.onCall(
  async (): Promise<boolean> => {
    try {
      const email = functions.config().env.admin_email;
      functions.logger.info(`email: ${email}`);
      if (email) {
        const record = await admin.auth().getUserByEmail(email);
        functions.logger.info(`uid: ${record.uid}`);

        await admin.auth().setCustomUserClaims(record.uid, fullCustomClaim);

        return true;
      }
      return false;
    } catch(e) {
      console.error(e);
      return false;
    }
  }
);

export default attachRolesToAdmin;
