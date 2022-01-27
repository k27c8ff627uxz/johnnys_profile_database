import { useState } from 'react';
import { createContainer } from 'unstated-next';
import {
  User,
  sendEmailVerification,
} from 'firebase/auth';

const useAccountContainer = () => {
  const [user, setUser] = useState<User | null>(null);

  return {
    uid: user ? (user.emailVerified ? user.uid : null) : null,

    setUserInfo: (user: User) => {
      setUser(user);
    },

    resetUserInfo: () => {
      setUser(null);
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
