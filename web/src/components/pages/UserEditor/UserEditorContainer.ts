import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { getFunctions, httpsCallable } from 'firebase/functions';
import FrameworkViewContainer from 'models/frameworkView';
import { GetUserProfileRequest, GetUserProfileResponse } from 'common/api/user/getUserProfile';
import { RowItem } from './types';

const userEditorContainer = () => {
  const { beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [rows, setRows] = useState<RowItem[]>([]);

  const functions = getFunctions();
  const getUserProfile = httpsCallable<GetUserProfileRequest, GetUserProfileResponse>(functions, 'getUserProfile');

  const reloadData = () => {
    beginLoading();
    getUserProfile({}).then(apiResult => {
      const result = apiResult.data;
      switch (result.result) {
      case 'success':
        setRows(result.data.map(item => ({
          id: item.uid,
          name: item.name,
          email: item.email,
          customClaim: item.customClaim,
          verified: item.verified,
        })));
        break;
      case 'error':
        console.error(result.errorMessage);
        break;
      case 'notAuthenticated':
        throw new Error('Unreach');
      }
    }).catch(e => {
      console.error(e);
      setRows([]);
    }).finally(() => {
      finishLoading();
    });
  };

  useEffect(() => {
    reloadData();
  }, []);

  return {
    rows,
  };
};

const UserEditorContainer = createContainer(userEditorContainer);
export default UserEditorContainer;
