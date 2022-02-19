import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UpdateProfileRequest, UpdateProfileResponse } from '../../common/api/profile/updateProfile';

const updateProfile = functions.https.onCall(
  async (params: UpdateProfileRequest, context): Promise<UpdateProfileResponse> => {
    const uid = params.uid;
    const ref = admin.database().ref('mainData/profile');

    const updateData = {
      [`${uid}`]: params.profile,
    };
    functions.logger.info(`updateData: ${JSON.stringify(updateData)}`);
  
    try {
      // 登録
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

export default updateProfile;
