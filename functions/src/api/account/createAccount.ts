import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CreateAccountRequest, CreateAccountResponse } from 'common/api/account/createAccount';

const createAccount = functions.https.onCall(
  async (params: CreateAccountRequest): Promise<CreateAccountResponse> => {
    const { name, email, password } = params;

    try {
      await admin.auth().createUser({
        email,
        password,
        displayName: name,
      });
    } catch(e) {
      functions.logger.info(`Fail to create Account: ${email}`);
      functions.logger.error(e);
      return {
        result: false,
        errorMessage: e.message,
      };
    }

    functions.logger.info(`Success to create Account: ${email}`);
    return {
      result: true,
    };
  }
);

export default createAccount;
