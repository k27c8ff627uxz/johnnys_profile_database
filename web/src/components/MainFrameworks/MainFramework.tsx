import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  LinearProgress,
  Toolbar,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import MainAppBar from './MainAppBar';
import MainMenu from './MainMenu';
import MainContents from './MainContents';
import Modals from './Modals';
import FrameworkViewContainer from 'models/frameworkView';

const DrawerHeader = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  backgroundColor: theme.palette.grey[200],
  padding: theme.spacing(0, 1),
}));

const MainBox = styled(Box)<{
  drawerWidth: number;
  isPCDrawerOpen: boolean;
}>(({theme, drawerWidth, isPCDrawerOpen}) => ({
  [theme.breakpoints.up('md')]: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(isPCDrawerOpen && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    }),
  },
}));

export interface MainFrameworkProps {
  drawerWidth: number;
}

const MainFramework: React.FC<MainFrameworkProps> = (props) => {
  const { isLoading } = FrameworkViewContainer.useContainer();
  const { drawerWidth } = props;
  const [isDrawerOpen, setDrawerOpen] = useState<'none' | 'mobile' | 'pc'>('none');

  return (
    <Box>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={
          isDrawerOpen === 'pc'
            ? {
              width: { md: `calc(100% - ${drawerWidth}px)` },
              ml: { md: `${drawerWidth}px` },
            }
            : {}
        }
      >
        <Toolbar>
          <MainAppBar
            isPCDrawerOpen={isDrawerOpen === 'pc'}
            isMobileDrawerOpen={isDrawerOpen === 'mobile'}
            handleOpenPCDrawer={() => setDrawerOpen('pc')}
            handleOpenMobileDrawer={() => setDrawerOpen('mobile')}
          />
        </Toolbar>
      </AppBar>
      {/* PC Drawer */}
      <Drawer
        open={isDrawerOpen === 'pc'}
        variant='persistent'
        anchor='left'
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={() => setDrawerOpen('none')}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <MainMenu />
      </Drawer>
      {/* Mobile Drawer */}
      <Drawer
        variant='temporary'
        open={isDrawerOpen === 'mobile'}
        onClose={() => setDrawerOpen('none')}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
      >
        <MainMenu handleSelected={() => { setDrawerOpen('none'); }} />
      </Drawer>
      <MainBox drawerWidth={drawerWidth} isPCDrawerOpen={isDrawerOpen === 'pc'} sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <Toolbar />
        {isLoading && <LinearProgress />}
        <Box sx={{flexGrow: 1}}>
          <MainContents />
        </Box>
      </MainBox>
      <Modals />
    </Box>
  );
};

export default MainFramework;
