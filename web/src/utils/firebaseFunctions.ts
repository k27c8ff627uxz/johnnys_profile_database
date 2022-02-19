import { httpsCallable, Functions } from 'firebase/functions';
import { CreateAccountRequest, CreateAccountResponse } from 'common/api/account/createAccount';
import { UpdateAccountRequest, UpdateAccountResponse } from 'common/api/account/updateAccount';
import { GetUserProfileRequest, GetUserProfileResponse } from 'common/api/user/getUserProfile';
import { UpdateUserSettingRequest, UpdateUserSettingResponse } from 'common/api/user/updateUserSetting';
import { GetProfileListResponse } from 'common/api/profile/getProfileList';
import { AddProfileRequest, AddProfileResponse } from 'common/api/profile/addProfile';
import { UpdateProfileRequest, UpdateProfileResponse } from 'common/api/profile/updateProfile';

const createAccount = (functions: Functions) => httpsCallable<CreateAccountRequest, CreateAccountResponse>(functions, 'createAccount');
const updateAccount = (functions: Functions) => httpsCallable<UpdateAccountRequest, UpdateAccountResponse>(functions, 'updateAccount');
const getUserProfile = (functions: Functions) => httpsCallable<GetUserProfileRequest, GetUserProfileResponse>(functions, 'getUserProfile');
const updateUserSetting = (functions: Functions) => httpsCallable<UpdateUserSettingRequest, UpdateUserSettingResponse>(functions, 'updateUserSetting');
const getProfileList = (functions: Functions) => httpsCallable<void, GetProfileListResponse>(functions, 'getProfileList');
const addProfile = (functions: Functions) => httpsCallable<AddProfileRequest, AddProfileResponse>(functions, 'addProfile');
const updateProfile = (functions: Functions) => httpsCallable<UpdateProfileRequest, UpdateProfileResponse>(functions, 'updateProfile');

export {
  createAccount,
  updateAccount,
  getUserProfile,
  updateUserSetting,
  getProfileList,
  addProfile,
  updateProfile,
};
