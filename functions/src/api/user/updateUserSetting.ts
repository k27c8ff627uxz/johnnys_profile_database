import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UpdateUserSettingRequest, UpdateUserSettingResponse } from '../../common/api/user/updateUserSetting';
import { getCustomClaim } from '../../utils/getCustomClaim';

const updateUserSetting = functions.https.onCall(
  async (params: UpdateUserSettingRequest, context): Promise<UpdateUserSettingResponse> => {

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
    if (!myCustomClaim.userManage) {
      functions.logger.error('Not User Manager Account!');
      return {
        result: 'unauthenticated',
      };
    }

    try {
      const customClaim = params.customClaim;
      if (customClaim) {
        await admin.auth().setCustomUserClaims(params.uid, customClaim);
        return {
          result: 'success',
          userRecord: {
            uid: params.uid,
            customClaim,
          },
        };
      }
    } catch(e) {
      console.error(e);
      return {
        result: 'error',
        errorMessage: e.message,        
      };
    }

    return {
      result: 'success',
      userRecord: {
        uid: params.uid,
      },
    };
  }
);

export default updateUserSetting;
