import React from 'react';
import {
  Navigate,
} from 'react-router-dom';
import Loading from './Loading';
import AccountContainer from '../../models/account';

const PublicRoute: React.FC<{component: React.ReactNode}> = ({ component })=> {
  const { authInfo } = AccountContainer.useContainer();

  switch(authInfo.state) {
  case 'undefined':
    return <Loading />;
  case 'login':
    return <Navigate to='/' />;
  case 'notVerify':
  case 'logout':
    return <>{component}</>;
  }
};

export default PublicRoute;
