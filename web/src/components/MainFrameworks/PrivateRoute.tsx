import React from 'react';
import {
  Navigate,
} from 'react-router-dom';
import AccountContainer from '../../models/account';
import literals from '../../utils/literals';

const PrivateRoute: React.FC<{component: React.ReactNode}> = ({ component })=> {
  const { userInfo } = AccountContainer.useContainer();

  if (userInfo === null) {
    return <Navigate to={literals.path.account.login} />;
  }

  return <>{component}</>;
};

export default PrivateRoute;
