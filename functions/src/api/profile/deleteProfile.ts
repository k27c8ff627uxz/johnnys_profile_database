import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DeleteProfileRequest, DeleteProfileResponse } from '../../common/api/profile/deleteProfile';

const deleteProfile = functions.https.onCall(
  async (params: DeleteProfileRequest, context): Promise<DeleteProfileResponse> => {
    const { id } = params;
    const ref = admin.database().ref(`mainData/profile/${id}`);

    // TODO: idからどのプロフィールを消したか表示
    functions.logger.info(`delete id: ${id}`);
  
    try {
      // 登録
      await ref.set({});

      // 結果の返却
      return {
        result: 'success',
        id,
      };
    } catch(e) {
      return {
        result: 'error',
        errorMessage: e.message,
      };
    }
  }
);

export default deleteProfile;
