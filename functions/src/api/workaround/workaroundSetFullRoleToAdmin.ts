import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CustomUserClaim } from 'common/types/CustomUserClaim';

const fullCustomClaim: CustomUserClaim = {
  version: '1.0.0',
  editData: true,
  userManage: true,
};

const workaroundSetFullRoleToAdmin = functions.https.onCall(
  async (): Promise<void> => {
    // Type your email
    // TODO: Load email address from environment variable
    const email = 'your.email@example.com';
    functions.logger.info(`email: ${email}`);
    const record = await admin.auth().getUserByEmail(email);
    functions.logger.info(`uid: ${record.uid}`);

    await admin.auth().setCustomUserClaims(record.uid, fullCustomClaim);
  }
);

export default workaroundSetFullRoleToAdmin;
