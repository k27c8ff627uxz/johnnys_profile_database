import React, { PropsWithChildren } from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  AccountBox as AccountBoxIcon,
  Dashboard as DashboardIcon,
  Face as FaceIcon,
} from '@mui/icons-material';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import AccountContainer from 'models/account';
import literals from '../../utils/literals';

const ListItemNavLink: React.FC<PropsWithChildren<{
  to: string,
}>> = ({to, children}) => {
  const searchParams = useSearchParams()[0];
  const location = useLocation();
  const paths = location.pathname.split('/');
  const selected = paths.some((value) => value === to.split('/')[1]);

  // TODO: Queryの生成は共通コンポーネントで行う
  const search = (() => {
    const today = searchParams.get(literals.queryParam.today);
    if (today === null) {
      return '';
    }
    return `?${literals.queryParam.today}=${today}`;
  })();

  return (
    <ListItemButton
      component={NavLink}
      selected={selected}
      to={{
        pathname: to,
        search,
      }}
    >
      {children}
    </ListItemButton>
  );
};

export interface MainMenuProp {
  handleSelected?: () => void;
}

const MenuItem: React.FC<{
  text: string;
  link: string;
  icon: React.ReactNode;
}> = (params) => {
  const { text, link, icon } = params;
  return (
    <ListItemNavLink
      to={link}
    >
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemNavLink>
  );
};

const MainMenu: React.FC<MainMenuProp> = ({ handleSelected }) => {
  const { authInfo } = AccountContainer.useContainer();

  return (
    <List onClick={handleSelected}>
      <MenuItem text='Dashboard' link={literals.path.dashboard} icon={<DashboardIcon />} />
      <MenuItem text='Profile Data' link={literals.path.profileList} icon={<FaceIcon />} />
      {authInfo.state === 'login' && authInfo.customClaim.role.userManage &&
        <MenuItem text='User Editor' link={literals.path.userEditor} icon={<AccountBoxIcon />} />
      }
    </List>
  );
};

export default MainMenu;
