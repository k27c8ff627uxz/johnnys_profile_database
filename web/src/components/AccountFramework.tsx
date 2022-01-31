import React, { useEffect, useState } from 'react';
import {
  getAuth,
  signOut,
} from 'firebase/auth';
import { MySuccessSnackbar } from 'utils/mycomponents';
import MainFramework from './MainFrameworks/MainFramework';
import AccountContainer from 'models/account';

const AccountFramework: React.FC = () => {
  const { setCurrentUser, resetCurrentUser } = AccountContainer.useContainer();
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const [onAuthStateChangeNotSet, setOnAuthStateChangeNotSet] = useState(true);

  const auth = getAuth();

  const onSignOut = async () => {
    try {
      await signOut(auth);
      setLogoutOpen(true);
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // setStateでレンダリング毎に呼ばれるのを防ぐため
    if(onAuthStateChangeNotSet) {
      auth.onAuthStateChanged(user => {
        if (user === null) {
          resetCurrentUser();
        } else {
          setCurrentUser(user);
        }
      });
      setOnAuthStateChangeNotSet(false);
    }
  }, [onAuthStateChangeNotSet]);

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
