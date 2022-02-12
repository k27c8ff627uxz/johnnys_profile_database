import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CreateAccountRequest, CreateAccountResponse } from 'common/api/account/createAccount';
import { CustomUserClaim } from 'common/types/CustomUserClaim';

const defaultCustomClaim: CustomUserClaim = {
  version: '1.0.0',
  role: {
    editData: false,
    userManage: false,
  },
};

const createAccount = functions.https.onCall(
  async (params: CreateAccountRequest): Promise<CreateAccountResponse> => {
    const { name, email, password } = params;

    try {
      // 既にメールが登録されているかチェック
      const usersResult = await admin.auth().listUsers();
      if (usersResult.users.find((user) => user.email && user.email.toLocaleLowerCase() === email.toLocaleLowerCase())) {
        functions.logger.error(`Duplicated signup ${email}`);
        return {
          result: 'alreadyExist',
        };
      }

      // アカウントの作成
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: name,
      });

      await admin.auth().setCustomUserClaims(userRecord.uid, defaultCustomClaim);

    } catch(e) {
      functions.logger.info(`Fail to create Account: ${email}`);
      functions.logger.error(e);
      return {
        result: 'error',
        errorMessage: e.message,
      };
    }

    functions.logger.info(`Success to create Account: ${email}`);
    return {
      result: 'success',
    };
  }
);

export default createAccount;
