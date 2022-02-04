import React, { useState } from 'react';
import {
  getAuth,
  signOut,
} from 'firebase/auth';
import { MySuccessSnackbar } from 'utils/mycomponents';
import MainFramework from './MainFrameworks/MainFramework';

const AccountFramework: React.FC = () => {
  const [isLogoutOpen, setLogoutOpen] = useState(false);

  const auth = getAuth();

  const onSignOut = async () => {
    try {
      await signOut(auth);
      setLogoutOpen(true);
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <MainFramework
        drawerWidth={240}
        handleSignOut={onSignOut}
      />
      <MySuccessSnackbar open={isLogoutOpen} autoHideDuration={6000} onClose={() => setLogoutOpen(false)}>
        ログアウトしました。
      </MySuccessSnackbar>
    </React.Fragment>
  );
};

export default AccountFramework;
