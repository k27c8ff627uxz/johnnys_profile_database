import { useState } from 'react';
import { createContainer } from 'unstated-next';
import {
  User,
  sendEmailVerification,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from 'firebase/auth';

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
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({state: 'undefined'});

  const updateUserInfo = (user: User) => {
    setUserInfo({
      state: 'login',
      name: user.displayName ?? '',
      email: user.email ?? '',
    });
  };

  return {
    userInfo,

    setCurrentUser: (user: User) => {
      setUser(user);
      if(user.emailVerified) {
        updateUserInfo(user);
      }
    },

    resetCurrentUser: () => {
      setUser(null);
      setUserInfo({state: 'logout'});
    },

    reload: async () => {
      if (!user) {
        return;
      }
      await user.reload();
      updateUserInfo(user);
    },

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
