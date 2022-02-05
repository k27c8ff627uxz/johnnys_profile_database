import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import {
  User,
  getAuth,
} from 'firebase/auth';
import AuthState, { AuthInfoUndefined, AuthInfoLogout, AuthInfoNotVerify, AuthInfoLogin } from './auth';


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
      setAuthInfo(new AuthInfoLogout());
    } else if (user.emailVerified) {
      setAuthInfo(new AuthInfoLogin(user));
    } else {
      setAuthInfo(new AuthInfoNotVerify(user));
    }
  };

  const reload = async () => {
    if (authInfo.state === 'login' || authInfo.state === 'notVerify') {
      const user = await authInfo.reload();
      updateUser(user);
    }
  };

  return {
    authInfo,
    reload,
  };
};

const AccountContainer = createContainer(useAccountContainer);
export default AccountContainer;
