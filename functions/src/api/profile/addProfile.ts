import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { AddProfileRequest, AddProfileResponse } from '../../common/api/profile/addProfile';
import { generateUUID } from '../../utils/generateUuid';

const ref = admin.database().ref('mainData/profile');

async function getAllId(): Promise<string[]> {
  const snapshot = await ref.get();
  return Object.keys(snapshot.val());
}

const addProfile = functions.https.onCall(
  async (params: AddProfileRequest, context): Promise<AddProfileResponse> => {
    try {

      // uidの重複を防ぐために、すべてのUIDを取得
      const existedIds = await getAllId();
      const uid = generateUUID(existedIds);
      functions.logger.info(`New Uid: ${uid}`);

      // 登録
      const updateData = {
        [`${uid}`]: params.profile,
      };
      functions.logger.info(`updateData: ${JSON.stringify(updateData)}`);
      await ref.update(updateData);

      // 結果の返却
      return {
        result: 'success',
        profile: params.profile,
        id: uid,
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
