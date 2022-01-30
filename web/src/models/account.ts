import { useState } from 'react';
import { createContainer } from 'unstated-next';
import {
  User,
  sendEmailVerification,
} from 'firebase/auth';

interface UserInfo {
  name: string;
  email: string;
}

const useAccountContainer = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const updateUserInfo = (user: User) => {
    setUserInfo({
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
      setUserInfo(null);
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
  };
};

const AccountContainer = createContainer(useAccountContainer);
export default AccountContainer;
