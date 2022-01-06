import React, { PropsWithChildren } from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Face as FaceIcon,
} from '@mui/icons-material';
import { NavLink, useLocation } from 'react-router-dom';
import literals from '../../utils/literals';

const ListItemNavLink: React.FC<PropsWithChildren<{
  to: string,
}>> = ({to, children}) => {
  const location = useLocation();
  const paths = location.pathname.split('/');
  const selected = paths.some((value) => value === to.split('/')[1]);
  return (
    <ListItemButton
      component={NavLink}
      selected={selected}
      to={to}
    >
      {children}
    </ListItemButton>
  );
};

export interface MainMenuProp {
  handleSelected?: () => void;
}

const MainMenu: React.FC<MainMenuProp> = ({ handleSelected }) => {
  return (
    <List onClick={handleSelected}>
      <ListItemNavLink
        to={literals.path.dashboard}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItemNavLink>
      <ListItemNavLink
        to={literals.path.profileList}
      >
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary='Profile Data' />
      </ListItemNavLink>
    </List>
  );
};

export default MainMenu;
