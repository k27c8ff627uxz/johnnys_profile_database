import React from 'react';
import MainFramework from './MainFrameworks/MainFramework';
import { HashRouter } from 'react-router-dom';
import {
  getAuth,
  signOut,
} from 'firebase/auth';
import * as firebase from 'firebase/app';
import InitializingError from './InitializingError';
import AccountContainer from '../models/account';

const AccountFramework: React.FC = () => {
  const { setUserInfo, resetUserInfo } = AccountContainer.useContainer();
  const auth = getAuth();
  auth.onAuthStateChanged(user => {
    if (user === null) {
      resetUserInfo();
    } else {
      setUserInfo({uid: user.uid});
    }
  });

  return (
    <MainFramework
      drawerWidth={240}
      handleSignOut={() => signOut(auth) }
    />
  );
};

const App: React.FC = () => {

  try {
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
    });
  } catch(e) {
    console.log(e);
    return (<InitializingError />);
  }

  return (
    <HashRouter>
      <AccountContainer.Provider>
        <AccountFramework />
      </AccountContainer.Provider>
    </HashRouter>
  );
};

export default App;
