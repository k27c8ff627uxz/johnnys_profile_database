import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import {
  User,
  sendEmailVerification,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
  getAuth,
} from 'firebase/auth';
import AuthState, { AuthInfoUndefined, AuthInfoLogout, AuthInfoNotVerify, AuthInfoLogin } from './auth';

type UserInfo = {
  state: 'login';
  name: string;
  email: string;
} | {
  state: 'logout';
} | {
  state: 'undefined'
};

const useAccountContainer = () => {
  const [onAuthStateChangeNotSet, setOnAuthStateChangeNotSet] = useState(true);
  const [authInfo, setAuthInfo] = useState<AuthState>(new AuthInfoUndefined());
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({state: 'undefined'});

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
      updateUserInfo(user);
    }
  };

  const updateUserInfo = (user: User) => {
    setUserInfo({
      state: 'login',
      name: user.displayName ?? '',
      email: user.email ?? '',
    });
  };

  const setCurrentUser = (user: User) => {
    setUser(user);
    if(user.emailVerified) {
      updateUserInfo(user);
    }
  };

  const resetCurrentUser = () => {
    setUser(null);
    setUserInfo({state: 'logout'});
  };

  return {
    authInfo,

    setCurrentUser,
    resetCurrentUser,

    reload,

    sendEmailVerification: async () => {
      if (user === null) {
        return;
      }
      await sendEmailVerification(user);
    },

    updatePassword: async (currentPassword: string, newPassword: string): Promise<'success' | 'failCredential' | 'failChange' | 'unknown'> => {
      if (user === null || userInfo.state === 'undefined' || userInfo.state === 'logout') {
        return 'unknown';
      }
      const credential = EmailAuthProvider.credential(
        userInfo.email,
        currentPassword,
      );
      try {
        await reauthenticateWithCredential(user, credential);
        try {
          await updatePassword(user, newPassword);
        } catch(e) {
          console.error(e);
          return 'failChange';
        }
        return 'success';
      } catch(e) {
        console.error(e);
        return 'failCredential';
      }
    },

    deleteUser: async () => {
      if (user === null || userInfo.state === 'undefined' || userInfo.state === 'logout') {
        return;
      }

      await deleteUser(user);
    },
  };
};

const AccountContainer = createContainer(useAccountContainer);
export default AccountContainer;
