import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GetUserProfileRequest, GetUserProfileResponse } from 'common/api/user/getUserProfile';
import { getCustomClaim } from 'common/utils/getCustomClaim';

const getUserProfile = functions.https.onCall(
  async (params: GetUserProfileRequest, context): Promise<GetUserProfileResponse> => {
    if (!context.auth?.uid) {
      functions.logger.error('Not Authenticated!');
      return {
        result: 'notAuthenticated',
      };
    }

    try {
      const usersResult = await admin.auth().listUsers();
      return {
        result: 'success',
        data: usersResult.users.map(record => ({
          uid: record.uid,
          name: record.displayName,
          email: record.email,
          customClaim: getCustomClaim(record.customClaims),
          verified: record.emailVerified,
        })),
      };
    } catch(e) {
      functions.logger.error(e);
      return {
        result: 'error',
        errorMessage: e.message,
      };
    }
  }
);

export default getUserProfile;
