import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
} from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import MainAppBar from './MainAppBar';
import MainMenu from './MainMenu';
import MainContents from './MainContents';

const DrawerHeader = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  backgroundColor: theme.palette.grey[200],
  padding: theme.spacing(0, 1),
}));

const MainBox = styled(Box)<{
  drawerWidth: number;
  isDrawerOpen: boolean;
}>(({theme, drawerWidth, isDrawerOpen}) => ({
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isDrawerOpen && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  }),
}));

export interface MainFrameworkProps {
  drawerWidth: number;
}

const MainFramework: React.FC<MainFrameworkProps> = (props) => {
  const { drawerWidth } = props;
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <AppBar
        position='fixed'
        sx={
          isDrawerOpen 
            ? {
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
            }
            : {}
        }
      >
        <Toolbar>
          <MainAppBar
            isDrawerOpen={isDrawerOpen}
            handleOpenDrawer={() => setDrawerOpen(true)}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        open={isDrawerOpen}
        variant='persistent'
        anchor='left'
        sx={{
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <MainMenu />
      </Drawer>
      <MainBox drawerWidth={drawerWidth} isDrawerOpen={isDrawerOpen}>
        <Toolbar />
        <MainContents />
      </MainBox>
    </Box>
  );
};

export default MainFramework;

