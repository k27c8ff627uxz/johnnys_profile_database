import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  applyActionCode,
  getAuth,
} from 'firebase/auth';
import FrameworkViewContainer from 'models/frameworkView';
import literals from 'utils/literals';

const Err: React.FC<{text1: string}> = ({text1}) => {
  return (
    <React.Fragment>
      <Typography sx={{m: 2}}>
        {text1}
      </Typography>
      <Typography sx={{m: 2}}>
        コードが正しくありません。
      </Typography>
    </React.Fragment>
  );
};

const VerifyEmail: React.FC<{
  finishLoading: () => void;
  code: string | null;
}> = (params) => {
  const { finishLoading, code } = params;
  const [state, setState] = useState<'doing' | 'success' | 'fail'>('doing');
  const [isExcuted, setExcuted] = useState(false);

  const auth = getAuth();

  if (code === null) {
    return <Err text1='メールの確認に失敗しました' />;
  }

  if (!isExcuted) {
    applyActionCode(auth, code)
      .then(() => {
        setState('success');
      }).catch((e) => {
        console.log(e);
        setState('fail');
      }).finally(() => {
        finishLoading();
      });
    setExcuted(true);
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
          <Link to={literals.path.account.login}>ログインページ</Link>より、再度ログインを行って下さい。
        </Typography>
      </>
    );
  case 'fail':
    return <Err text1='メールの確認に失敗しました' />;
  }
};

const Action: React.FC = () => {
  const searchParams = useSearchParams()[0];
  const { beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  beginLoading();

  return (
    <Container sx={{textAlign: 'center'}}>
      {(() => {
        switch(searchParams.get('mode')) {
        case 'verifyEmail':
          return <VerifyEmail
            finishLoading={finishLoading}
            code={searchParams.get('oobCode')}
          />;
        default:
          finishLoading();
          return (
            <Typography sx={{m: 2}}>
              不明なアクションです。
            </Typography>
          );
        }
      })()}
    </Container>
  );
};

export default Action;
