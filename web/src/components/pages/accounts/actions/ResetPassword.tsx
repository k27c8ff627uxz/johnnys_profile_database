import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
} from '@mui/material';
import {
  getAuth,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from 'firebase/auth';
import ResetPasswordInput from './ResetPasswordInput';
import FrameworkViewContainer from 'models/frameworkView';
import literals from 'utils/literals';

const ResetPassword: React.FC<{code: string | null}> = ({code}) => {
  const [state, setState] = useState<
    | 'resettingPassword'
    | 'failReset'
    | 'setPassword'
    | 'settingPassword'
    | 'failSettingPassword'
    | 'allSuccess'
    | 'nothingCode'
    | null
  >(null);
  const { beginLoading, finishLoading, isLoading } = FrameworkViewContainer.useContainer();

  const auth = getAuth();

  useEffect(() => {
    // 初期時しか実行させない
    if (state !== null) {
      return;
    }

    // コードがない場合はエラーで返す
    if (code === null) {
      setState('nothingCode');
      return;
    }

    beginLoading();
    verifyPasswordResetCode(auth, code)
      .then(() => {
        setState('setPassword');
      }).catch((e) => {
        console.log(e);
        setState('failReset');
      }).finally(() => {
        finishLoading();
      });
  }, [state]);

  const onSetPassword = (password: string) => {
    if (code === null) {
      throw new Error('Unreach');
    }

    beginLoading();
    confirmPasswordReset(auth, code, password)
      .then(() => {
        setState('allSuccess');
      }).catch((e) => {
        console.log(e);
        setState('failSettingPassword');
      }).finally(() => {
        finishLoading();
      });
  };

  switch(state) {
  case 'resettingPassword':
    return (
      <Typography sx={{m: 2}}>
        パスワード初期化中です...
      </Typography>
    );
  case 'failReset':
    return (
      <React.Fragment>
        <Typography sx={{m: 2}}>
          パスワードの再設定に失敗しました。  
        </Typography>
        <Typography sx={{m: 2}}>
          コードが正しくありません。
        </Typography>
      </React.Fragment>
    );
  case 'setPassword':
    return (
      <ResetPasswordInput
        onSetPassword={onSetPassword}
        isLoading={isLoading}
      />
    );
  case 'failSettingPassword':
    return (
      <React.Fragment>
        <Typography sx={{m: 2}}>
          パスワードの再設定に失敗しました。  
        </Typography>
        <Typography sx={{m: 2}}>
          大変お手数おかけしますが、もういちどパスワードの再設定をやりなおして下さい。
        </Typography>
      </React.Fragment>
    );
  case 'allSuccess':
    return (
      <React.Fragment>
        <Typography sx={{textAlign: 'center', m: 2}}>
          パスワードの再設定に成功しました。
        </Typography>
        <Typography sx={{textAlign: 'center', m: 2}}>
          <Link to={literals.path.account.login}>ログインページ</Link>より、ログインを行って下さい。
        </Typography>
      </React.Fragment>
    );
  case 'nothingCode':
    return (
      <Typography sx={{m: 2}}>
        コードが指定されていないため、メールの確認に失敗しました。  
      </Typography>
    );
  default:
    return <React.Fragment />;
  }
};

export default ResetPassword;
