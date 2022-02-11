import React from 'react';
import {
  Navigate,
} from 'react-router-dom';
import Loading from './Loading';
import AccountContainer from '../../models/account';
import { AuthInfoLogin } from '../../models/auth';
import literals from '../../utils/literals';
import { CustomUserClaim } from 'common/types/CustomUserClaim';

interface PrivateRouteProps {
  component: (authInfo: AuthInfoLogin) => React.ReactNode;
  optionalCondition?: (customClaim: CustomUserClaim) => boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component, optionalCondition })=> {
  const { authInfo } = AccountContainer.useContainer();

  switch(authInfo.state) {
  case 'undefined':
    return <Loading />;
  case 'login':
    if (optionalCondition && !optionalCondition(authInfo.customClaim)) {
      return <Navigate to={literals.path.dashboard} />;
    }
    return <>{component(authInfo)}</>;
  case 'notVerify':
  case 'logout':
    return <Navigate to={literals.path.account.login} />;
  }
};

export default PrivateRoute;
