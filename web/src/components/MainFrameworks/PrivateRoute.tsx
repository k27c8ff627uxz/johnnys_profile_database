import React from 'react';
import {
  Navigate,
} from 'react-router-dom';
import Loading from './Loading';
import AccountContainer from '../../models/account';
import { AuthInfoLogin } from '../../models/auth';
import literals from '../../utils/literals';

const PrivateRoute: React.FC<{component: (authInfo: AuthInfoLogin) => React.ReactNode}> = ({ component })=> {
  const { authInfo } = AccountContainer.useContainer();

  switch(authInfo.state) {
  case 'undefined':
    return <Loading />;
  case 'login':
    return <>{component(authInfo)}</>;
  case 'notVerify':
  case 'logout':
    return <Navigate to={literals.path.account.login} />;
  }
};

export default PrivateRoute;
