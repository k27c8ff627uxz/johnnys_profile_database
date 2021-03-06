import React, { useState, useEffect } from 'react';
import {
  Typography,
} from '@mui/material';
import AccountContainer from 'models/account';
import FrameworkViewContainer from 'models/frameworkView';

const VerifyEmail: React.FC<{
  code: string | null,
}> = (params) => {
  const { code } = params;
  const { reload, applyActionCode, authInfo } = AccountContainer.useContainer();
  const { beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [state, setState] = useState<'ready' | 'doing' | 'success' | 'failVerifying' | 'nothingCode' | null>(null);
  const [isExcuted, setExcuted] = useState(false);

  // ページロード直後はAuth情報が読み込まれていないのでauthInfo.stateはundefinedである
  // Auth情報が読まれたら、Code認証を実行するようにする
  useEffect(() => {
    if (authInfo.state === 'notVerify') {
      setState('ready');
    }
  }, [authInfo]);

  useEffect(() => {
    // 初期時しか実行させない
    if (state !== 'ready') {
      return;
    }

    // コードがない場合はエラーで返す
    if (code === null) {
      setState('nothingCode');
      return;
    }

    beginLoading();
    applyActionCode(code)
      .then(() => {
        setState('success');
        reload();
      }).catch((e) => {
        console.error(e);
        setState('failVerifying');
      }).finally(() => {
        finishLoading();
      });
    setExcuted(true);
  }, [state]);

  if (!isExcuted) {

  }

  switch(state) {
  case 'doing':
    return (
      <Typography sx={{m: 2}}>
        確認中です...
      </Typography>
    );
  case 'success':
    return (
      <>
        <Typography sx={{m: 2}}>
          メールの確認が正常に完了しました。
        </Typography>
        <Typography sx={{textAlign: 'center', m: 2}}>
          引き続きWebページをお楽しみ下さい。
        </Typography>
      </>
    );
  case 'failVerifying':
    return (
      <React.Fragment>
        <Typography sx={{m: 2}}>
          メールの確認に失敗しました。  
        </Typography>
        <Typography sx={{m: 2}}>
          コードが正しくありません。
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

export default VerifyEmail;
