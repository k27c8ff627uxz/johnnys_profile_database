import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UpdateAccountRequest, UpdateAccountResponse } from 'common/api/account/updateAccount';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

const updateAccount = functions.https.onCall(
  async (params: UpdateAccountRequest, context): Promise<UpdateAccountResponse> => {
    const uid = context.auth?.uid;
    const { name } = params;

    // 権限確認
    if (!uid) {
      functions.logger.info('Unauthenticated');
      return {
        result: 'unauthenticated',
      };
    }
    
    let result: UserRecord;
    try {
      result = await admin.auth().updateUser(
        uid,
        {
          displayName: name,
        }
      );
    } catch(e) {
      functions.logger.info(`Fail to update: ${uid}`);
      functions.logger.error(e);
      return {
        result: 'error',
        errorMessage: e.message,
      };
    }

    functions.logger.info(`Success to create Account: ${uid}`);
    return {
      result: 'success',
      userRecord: {
        uid: result.uid,
        name: result.displayName,
        email: result.email,
      },
    };
  }
);

export default updateAccount;
