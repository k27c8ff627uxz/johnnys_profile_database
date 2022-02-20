import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DeleteProfileRequest, DeleteProfileResponse } from '../../common/api/profile/deleteProfile';
import { getCustomClaim } from '../../utils/getCustomClaim';

const deleteProfile = functions.https.onCall(
  async (params: DeleteProfileRequest, context): Promise<DeleteProfileResponse> => {

    const uid = context.auth?.uid;
    // 認証チェック(非ログインユーザー)
    if (!uid) {
      functions.logger.error('Not Authenticated User!');
      return {
        result: 'unauthenticated',
      };
    }
  
    // 認証チェック(権限のないユーザー)
    const myCustomClaim = await getCustomClaim(uid);
    if (!myCustomClaim.role.editData) {
      functions.logger.error('Not Edit Data Account!');
      return {
        result: 'unauthenticated',
      };
    }

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
