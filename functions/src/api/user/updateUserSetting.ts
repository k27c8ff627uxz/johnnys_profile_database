import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UpdateUserSettingRequest, UpdateUserSettingResponse } from '../../common/api/user/updateUserSetting';
import { CustomUserClaim } from '../../common/types/CustomUserClaim';
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
    if (!myCustomClaim.role.userManage) {
      functions.logger.error('Not User Manager Account!');
      return {
        result: 'unauthenticated',
      };
    }

    try {
      const uid = params.uid;
      const prevCustomClaim = await getCustomClaim(uid);
      const paramCustomClaim = params.customClaim;

      if (paramCustomClaim) {

        const newCustomClaim: CustomUserClaim = {
          ...prevCustomClaim,
          role: {
            ...prevCustomClaim.role,
            editData: paramCustomClaim.role?.editData ?? prevCustomClaim.role.editData,
            userManage: paramCustomClaim.role?.userManage ?? prevCustomClaim.role.userManage,
          },
        };
        await admin.auth().setCustomUserClaims(params.uid, newCustomClaim);

        return {
          result: 'success',
          userRecord: {
            uid: params.uid,
            customClaim: newCustomClaim,
          },
        };
      }

      return {
        result: 'success',
        userRecord: {
          uid: params.uid,
          customClaim: prevCustomClaim,
        },
      };

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
