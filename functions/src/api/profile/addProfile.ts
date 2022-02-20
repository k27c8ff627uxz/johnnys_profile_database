import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { AddProfileRequest, AddProfileResponse } from '../../common/api/profile/addProfile';
import { generateUUID } from '../../utils/generateUuid';
import { getCustomClaim } from '../../utils/getCustomClaim';

const ref = admin.database().ref('mainData/profile');

async function getAllId(): Promise<string[]> {
  const snapshot = await ref.get();
  return Object.keys(snapshot.val());
}

const addProfile = functions.https.onCall(
  async (params: AddProfileRequest, context): Promise<AddProfileResponse> => {
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
  
    try {

      // uidの重複を防ぐために、すべてのUIDを取得
      const existedIds = await getAllId();
      const uuid = generateUUID(existedIds);
      functions.logger.info(`New Uuid: ${uuid}`);

      // 登録
      const updateData = {
        [`${uuid}`]: params.profile,
      };
      functions.logger.info(`updateData: ${JSON.stringify(updateData)}`);
      await ref.update(updateData);

      // 結果の返却
      return {
        result: 'success',
        profile: params.profile,
        id: uuid,
      };
    } catch(e) {
      return {
        result: 'error',
        errorMessage: e.message,
      };
    }
  }
);

export default addProfile;
