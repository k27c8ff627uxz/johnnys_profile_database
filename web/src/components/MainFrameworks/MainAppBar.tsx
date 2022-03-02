import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  StaticDatePicker,
  LocalizationProvider,
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useNavigate } from 'react-router-dom';
import {
  AccountCircle as AccountCircleIcon,
  Cancel as CancelIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Menu as MenuIcon,
  Today as TodayIcon,
} from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { MySuccessSnackbar } from 'utils/mycomponents';
import AccountContainer from '../../models/account';
import { AuthInfoLogin } from 'models/auth';
import { dateToString } from 'common/utils/date';
import { getToday } from 'utils/functions';
import literals from 'utils/literals';

export interface MainAppBarProps {
  isPCDrawerOpen: boolean;
  isMobileDrawerOpen: boolean;
  handleOpenPCDrawer: () => void;
  handleOpenMobileDrawer: () => void;
}

// TODO: getToday()もseachParamsも両方コールしてるので要リファクタリング
const Today = () => {
  const [todayMenuAnchor, setTodayMenuAnchor] = useState<Element | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const isSetToday = searchParams.has(literals.queryParam.today);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSetToday = (v: any) => {
    searchParams.set(literals.queryParam.today, dateToString(new Date(v), '.'));
    setSearchParams(searchParams);
    setTodayMenuAnchor(null);
  };

  const todayOnCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    searchParams.delete(literals.queryParam.today);
    setSearchParams(searchParams);
  };

  return (
    <React.Fragment>
      {/* TOOD: 日付が指定されたときの強調の方法 */}
      <Button
        startIcon={<TodayIcon />}
        color={isSetToday ? 'primary' : 'inherit'}
        variant={isSetToday ? 'contained' : 'text'}
        onClick={(event) => setTodayMenuAnchor(event.currentTarget)}
      >
        {dateToString(getToday())}
        { isSetToday && (
          <IconButton size='small' onClick={todayOnCloseClick}>
            <CancelIcon fontSize='inherit' />
          </IconButton>
        )}
      </Button>
      <Menu
        anchorEl={todayMenuAnchor}
        open={todayMenuAnchor !== null}
        onClose={() => setTodayMenuAnchor(null)}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs='desktop'
            value={getToday()}
            onChange={onSetToday}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Menu>
    </React.Fragment>
  );
};

const MainAppBar: React.FC<MainAppBarProps> = (props) => {
  const {
    isPCDrawerOpen,
    isMobileDrawerOpen,
    handleOpenPCDrawer,
    handleOpenMobileDrawer,
  } = props;

  const { authInfo } = AccountContainer.useContainer();
  const [userMenuAnchor, setUserMenuAnchor] = useState<Element | null>(null);
  const [isLogoutOpen, setLogoutOpen] = useState(false);

  const navigate = useNavigate();

  const onLogout = (authInfo: AuthInfoLogin) => {
    authInfo.logout()
      .then(() => setLogoutOpen(true));
  };

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
      {authInfo.state === 'login' &&
        <React.Fragment>
          <Button
            startIcon={<AccountCircleIcon />}
            endIcon={<KeyboardArrowDownIcon />}
            color='inherit'
            onClick={(event) => setUserMenuAnchor(event.currentTarget)}
          >
            {authInfo.name}
          </Button>
          <Menu
            anchorEl={userMenuAnchor}
            open={userMenuAnchor !== null}
            onClose={() => setUserMenuAnchor(null)}
          >
            <MenuItem
              onClick={() => { navigate(literals.path.account.profile); setUserMenuAnchor(null); }}
            >
              プロフィール
            </MenuItem>
            <MenuItem
              onClick={() => { navigate(literals.path.account.changePassword); setUserMenuAnchor(null); }}
            >
              パスワード変更
            </MenuItem>
            <MenuItem
              onClick={() => { onLogout(authInfo); setUserMenuAnchor(null); } }
            >
              ログアウト
            </MenuItem>
          </Menu>
        </React.Fragment>
      }
      <Today />
      <MySuccessSnackbar open={isLogoutOpen} autoHideDuration={6000} onClose={() => setLogoutOpen(false)}>
        ログアウトしました。
      </MySuccessSnackbar>
    </React.Fragment>
  );
};

export default MainAppBar;
