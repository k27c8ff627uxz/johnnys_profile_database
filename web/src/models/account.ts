import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useAccountContainer = () => {
  const [uid, setUid] = useState<string | null>(null);

  const setUserInfo = (params: {uid: string}) => {
    const { uid } = params;
    setUid(uid);
  };

  const resetUserInfo = () => {
    setUid(null);
  };

  return {
    uid,
    setUserInfo,
    resetUserInfo,
  };
};

const AccountContainer = createContainer(useAccountContainer);
export default AccountContainer;
