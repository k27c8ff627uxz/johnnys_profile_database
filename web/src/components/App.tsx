import React from 'react';
import { HashRouter } from 'react-router-dom';
import * as firebase from 'firebase/app';
import InitializingError from './InitializingError';
import AccountContainer from 'models/account';
import FrameworkViewContainer from 'models/frameworkView';
import MainFramework from './MainFrameworks/MainFramework';

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
        <FrameworkViewContainer.Provider>
          <MainFramework
            drawerWidth={240}
          />
        </FrameworkViewContainer.Provider>
      </AccountContainer.Provider>
    </HashRouter>
  );
};

export default App;
