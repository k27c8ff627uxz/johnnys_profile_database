import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GetProfileListResponse } from '../../common/api/profile/getProfileList';

const getProfileList = functions.https.onCall(
  async (): Promise<GetProfileListResponse> => {

    try {
      const ref = admin.database().ref('mainData/profile');
      const value = (await ref.get()).val();

      if(!value) {
        // 取得に失敗した場合でも、警告を残して成功で返す
        functions.logger.warn(`Fail getting profile: value = ${value}`);
        return {
          result: 'success',
          profileList: { },
        };
      }

      return {
        result: 'success',
        profileList: value,
      };
    } catch(e) {
      return {
        result: 'error',
        errorMessage: e.message,
      };
    }
  }
);

export default getProfileList;
