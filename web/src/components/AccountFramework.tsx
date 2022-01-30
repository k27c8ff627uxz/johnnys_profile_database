import React, { useState } from 'react';
import {
  Alert,
  Snackbar,
} from '@mui/material';
import {
  getAuth,
  signOut,
} from 'firebase/auth';
import MainFramework from './MainFrameworks/MainFramework';
import AccountContainer from 'models/account';

const AccountFramework: React.FC = () => {
  const { setUserInfo, resetUserInfo } = AccountContainer.useContainer();
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

  auth.onAuthStateChanged(user => {
    if (user === null) {
      resetUserInfo();
    } else {
      setUserInfo(user);
    }
  });

  return (
    <React.Fragment>
      <MainFramework
        drawerWidth={240}
        handleSignOut={onSignOut}
      />
      <Snackbar open={isLogoutOpen} autoHideDuration={6000} onClose={() => setLogoutOpen(false)}>
        <Alert onClose={() => setLogoutOpen(false)} severity='success' sx={{ width: '100%' }}>
          ログアウトしました。
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default AccountFramework;
