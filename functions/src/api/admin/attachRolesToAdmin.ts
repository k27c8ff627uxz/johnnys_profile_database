import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getCustomClaim } from '../../utils/getCustomClaim';

const attachRolesToAdmin = functions.https.onCall(
  async (): Promise<boolean> => {
    try {
      const email = functions.config().env.admin_email;
      functions.logger.info(`email: ${email}`);
      if (email) {
        const record = await admin.auth().getUserByEmail(email);
        const uid = record.uid;
        functions.logger.info(`uid: ${uid}`);

        const adminCustomClaim = await getCustomClaim(uid);

        await admin.auth().setCustomUserClaims(uid, {
          ...adminCustomClaim,
          role: {
            ...adminCustomClaim.role,
            admin: true,
          },
        });

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
