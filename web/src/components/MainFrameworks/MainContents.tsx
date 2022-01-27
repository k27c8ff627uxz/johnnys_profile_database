import React from 'react';
import {
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ProfileList from '../pages/ProfileList';
import Error404 from '../pages/Error404';
import Login from '../pages/accounts/Login';
import SignUp from '../pages/accounts/SignUp';
import SendVerificationEmail from '../pages/accounts/SendVerificationEmail';
import Action from '../pages/accounts/Action';
import literals from '../../utils/literals';

const MainContents: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to={literals.path.dashboard} />} />
      <Route path={literals.path.dashboard} element={<Dashboard />} />
      <Route path={literals.path.profileList} element={<ProfileList />} />
      <Route path={literals.path.account.login} element={<Login />} />
      <Route path={literals.path.account.signup} element={<SignUp />} />
      <Route path={literals.path.account.sendVerifying} element={<SendVerificationEmail />} />
      <Route path={literals.path.account.action} element={<Action />} />
      <Route path='*' element={<Error404 />} />
    </Routes>
  );
};

export default MainContents;
