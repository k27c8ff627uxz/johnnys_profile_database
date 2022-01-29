import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import AccountContainer from '../../models/account';

export interface MainAppBarProps {
  isPCDrawerOpen: boolean;
  isMobileDrawerOpen: boolean;
  handleOpenPCDrawer: () => void;
  handleOpenMobileDrawer: () => void;
  handleSignOut: () => void;
}

const MainAppBar: React.FC<MainAppBarProps> = (props) => {
  const {
    isPCDrawerOpen,
    isMobileDrawerOpen,
    handleOpenPCDrawer,
    handleOpenMobileDrawer,
    handleSignOut,
  } = props;

  const { userInfo } = AccountContainer.useContainer();
  const [userMenuAnchor, setUserMenuAnchor] = useState<Element | null>(null);

  return (
    <React.Fragment>
      {!isPCDrawerOpen &&
        <IconButton
          sx={{ display: { xs: 'none', md: 'inline' } }}
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={() => handleOpenPCDrawer()}
        >
          <MenuIcon />
        </IconButton>
      }
      {!isMobileDrawerOpen &&
        <IconButton
          sx={{ display: { xs: 'inline', md: 'none' } }}
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={() => handleOpenMobileDrawer()}
        >
          <MenuIcon />
        </IconButton>
      }
      <span style={{flexGrow: 1}} />
      {userInfo !== null && <Button
        startIcon={<AccountCircleIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        color='inherit'
        onClick={(event) => setUserMenuAnchor(event.currentTarget)}
      >
        {userInfo.name}
      </Button>}
      <Menu
        anchorEl={userMenuAnchor}
        open={userMenuAnchor !== null}
        onClose={() => setUserMenuAnchor(null)}
      >
        <MenuItem
          onClick={() => { handleSignOut(); setUserMenuAnchor(null); } }
        >
          ログアウト
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default MainAppBar;
