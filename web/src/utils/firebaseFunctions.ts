import { httpsCallable, Functions } from 'firebase/functions';
import { CreateAccountRequest, CreateAccountResponse } from 'common/api/account/createAccount';
import { UpdateAccountRequest, UpdateAccountResponse } from 'common/api/account/updateAccount';
import { GetUserProfileRequest, GetUserProfileResponse } from 'common/api/user/getUserProfile';
import { UpdateUserSettingRequest, UpdateUserSettingResponse } from 'common/api/user/updateUserSetting';

const createAccount = (functions: Functions) => httpsCallable<CreateAccountRequest, CreateAccountResponse>(functions, 'createAccount');
const updateAccount = (functions: Functions) => httpsCallable<UpdateAccountRequest, UpdateAccountResponse>(functions, 'updateAccount');
const getUserProfile = (functions: Functions) => httpsCallable<GetUserProfileRequest, GetUserProfileResponse>(functions, 'getUserProfile');
const updateUserSetting = (functions: Functions) => httpsCallable<UpdateUserSettingRequest, UpdateUserSettingResponse>(functions, 'updateUserSetting');

export {
  createAccount,
  updateAccount,
  getUserProfile,
  updateUserSetting,
};