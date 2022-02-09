import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import {
  User,
  getAuth,
  applyActionCode as firebaseApplyActionCode,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  verifyPasswordResetCode as firebaseVerifyPasswordResetCode,
  confirmPasswordReset as firebaseConfirmPasswordReset,
} from 'firebase/auth';
import AuthState, { AuthInfoUndefined, AuthInfoLogout, AuthInfoNotVerify, AuthInfoLogin } from './auth';
import { getCustomClaim } from 'common/utils/getCustomClaim';

const useAccountContainer = () => {
  const [onAuthStateChangeNotSet, setOnAuthStateChangeNotSet] = useState(true);
  const [authInfo, setAuthInfo] = useState<AuthState>(new AuthInfoUndefined());

  const auth = getAuth();
  useEffect(() => {
    // setStateでレンダリング毎に呼ばれるのを防ぐため
    if(onAuthStateChangeNotSet) {
      auth.onAuthStateChanged(user => {
        updateUser(user);
      });
      setOnAuthStateChangeNotSet(false);
    }
  }, [onAuthStateChangeNotSet]);

  const updateUser = (user: User | null) => {
    if (user === null) {
      setAuthInfo(new AuthInfoLogout(auth));
    } else if (!user.emailVerified) {
      setAuthInfo(new AuthInfoNotVerify(auth, user));
    } else {
      user.getIdTokenResult(true).then((value) => {
        const customClaim = getCustomClaim(value.claims);
        setAuthInfo(new AuthInfoLogin(auth, user, customClaim));
      });      
    }
  };

  const reload = async () => {
    if (authInfo.state === 'login' || authInfo.state === 'notVerify') {
      const user = await authInfo.reload();
      updateUser(user);
    }
  };

  const applyActionCode = async (code: string) => {
    await firebaseApplyActionCode(auth, code);
  };

  const sendPasswordResetEmail = async (email: string) => {
    await firebaseSendPasswordResetEmail(auth, email);
  };

  const verifyPasswordResetCode = async (code: string) => {
    const email = await firebaseVerifyPasswordResetCode(auth, code);
    return email;
  };

  const confirmPasswordReset = async (code: string, password: string) => {
    await firebaseConfirmPasswordReset(auth, code, password);
  };

  return {
    authInfo,
    reload,
    applyActionCode,
    sendPasswordResetEmail,
    verifyPasswordResetCode,
    confirmPasswordReset,
  };
};

const AccountContainer = createContainer(useAccountContainer);
export default AccountContainer;
