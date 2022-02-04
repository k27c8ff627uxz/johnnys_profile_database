import { AuthInfoLogin } from './AuthInfoLogin';
import { AuthInfoLogout } from './AuthInfoLogout';
import { AuthInfoNotVerify } from './AuthInfoNotVerify';
import { AuthInfoUndefined } from './AuthInfoUndefined';

type AuthInfo = 
  AuthInfoUndefined
  | AuthInfoLogout
  | AuthInfoLogin
  | AuthInfoNotVerify;

export {
  AuthInfoUndefined,
  AuthInfoLogout,
  AuthInfoLogin,
  AuthInfoNotVerify,
};
export default AuthInfo;
