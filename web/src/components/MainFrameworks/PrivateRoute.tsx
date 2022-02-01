import React from 'react';
import {
  Navigate,
} from 'react-router-dom';
import Loading from './Loading';
import AccountContainer from '../../models/account';
import literals from '../../utils/literals';

const PrivateRoute: React.FC<{component: React.ReactNode}> = ({ component })=> {
  const { userInfo } = AccountContainer.useContainer();

  switch(userInfo.state) {
  case 'undefined':
    return <Loading />;
  case 'login':
    return <>{component}</>;
  case 'logout':
    return <Navigate to={literals.path.account.login} />;
  }
};

export default PrivateRoute;
