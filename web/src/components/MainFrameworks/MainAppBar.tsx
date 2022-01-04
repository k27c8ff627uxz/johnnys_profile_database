import React from 'react';
import {
  IconButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
} from '@mui/icons-material';

export interface MainAppBarProps {
  isDrawerOpen: boolean;
  handleOpenDrawer: () => void;
}

const MainAppBar: React.FC<MainAppBarProps> = (props) => {
  const { isDrawerOpen, handleOpenDrawer } = props;

  return (
    <React.Fragment>
      {!isDrawerOpen &&
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={() => handleOpenDrawer()}
        >
          <MenuIcon />
        </IconButton>
      }
    </React.Fragment>
  );
};

export default MainAppBar;
