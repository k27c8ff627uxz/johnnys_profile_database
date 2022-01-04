import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  Toolbar,
} from '@mui/material';
import MainAppBar from './MainAppBar';
import MainMenu from './MainMenu';
import MainContents from './MainContents';

export interface MainFrameworkProps {
  drawerWidth: number;
}

const MainFramework: React.FC<MainFrameworkProps> = (props) => {
  const { drawerWidth } = props;
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{display: { xs: 'flex', md: 'none' } }}>
      <AppBar
        position='fixed'
      >
        <Toolbar>
          <MainAppBar
            isDrawerOpen={isDrawerOpen}
            handleOpenDrawer={() => setDrawerOpen(true)}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
      >
        <MainMenu />
      </Drawer>
      <Box>
        <Toolbar />
        <MainContents />
      </Box>
    </Box>
  );
};

export default MainFramework;
