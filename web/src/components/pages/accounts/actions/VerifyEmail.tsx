import React, { useState, useEffect } from 'react';
import {
  Typography,
} from '@mui/material';
import {
  applyActionCode,
  getAuth,
} from 'firebase/auth';
import AccountContainer from 'models/account';
import FrameworkViewContainer from 'models/frameworkView';

const VerifyEmail: React.FC<{
  code: string | null,
}> = (params) => {
  const { code } = params;
  const { reload } = AccountContainer.useContainer();
  const { beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [state, setState] = useState<'doing' | 'success' | 'failVerifying' | 'nothingCode' | null>(null);
  const [isExcuted, setExcuted] = useState(false);

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
    applyActionCode(auth, code)
      .then(() => {
        setState('success');
        reload().then();
      }).catch((e) => {
        console.log(e);
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
