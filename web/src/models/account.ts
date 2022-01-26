import { useState } from 'react';
import { createContainer } from 'unstated-next';
import {
  User,
} from 'firebase/auth';

const useAccountContainer = () => {
  const [user, setUser] = useState<User | null>(null);

  const setUserInfo = (user: User) => {
    setUser(user);
  };

  const resetUserInfo = () => {
    setUser(null);
  };

  return {
    uid: user === null ? null : user.uid,
    setUserInfo,
    resetUserInfo,
  };
};

const AccountContainer = createContainer(useAccountContainer);
export default AccountContainer;
