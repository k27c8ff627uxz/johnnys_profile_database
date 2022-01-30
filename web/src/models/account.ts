import { useState } from 'react';
import { createContainer } from 'unstated-next';
import {
  User,
  sendEmailVerification,
} from 'firebase/auth';

const useAccountContainer = () => {
  const [user, setUser] = useState<User | null>(null);

  return {
    userInfo : (user && user.emailVerified) ? {
      name: user.displayName ?? '',
      email: user.email ?? '',
    } : null,

    setUserInfo: (user: User) => {
      setUser(user);
    },

    resetUserInfo: () => {
      setUser(null);
    },

    reload: async () => {
      if (!user) {
        return;
      }
      await user.reload();
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
