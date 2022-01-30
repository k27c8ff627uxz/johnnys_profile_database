import React from 'react';
import {
  Navigate,
} from 'react-router-dom';
import AccountContainer from '../../models/account';

const PublicRoute: React.FC<{component: React.ReactNode}> = ({ component })=> {
  const { userInfo } = AccountContainer.useContainer();

  if (userInfo !== null) {
    return <Navigate to='/' />;
  }

  return <>{component}</>;
};

export default PublicRoute;
