import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GetProfileListResponse } from '../../common/api/profile/getProfileList';

const getProfileList = functions.https.onCall(
  async (): Promise<GetProfileListResponse> => {

    try {
      const ref = admin.database().ref('mainData/profile');
      const snapshot = await ref.get();

      return {
        result: 'success',
        profileList: snapshot.val(),
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
