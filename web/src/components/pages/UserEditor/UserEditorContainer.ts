import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { getFunctions, httpsCallable } from 'firebase/functions';
import FrameworkViewContainer from 'models/frameworkView';
import { GetUserProfileRequest, GetUserProfileResponse } from 'common/api/user/getUserProfile';
import { UpdateUserSettingRequest, UpdateUserSettingResponse } from 'common/api/user/updateUserSetting';
import { CustomUserClaim } from 'common/types/CustomUserClaim';
import { RowItem } from './types';

const userEditorContainer = () => {
  const { beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [rows, setRows] = useState<RowItem[]>([]);
  const [selectedRow, setSelectedRow] = useState<RowItem | null>(null);

  const functions = getFunctions();
  const getUserProfile = httpsCallable<GetUserProfileRequest, GetUserProfileResponse>(functions, 'getUserProfile');
  const updateUserSetting = httpsCallable<UpdateUserSettingRequest, UpdateUserSettingResponse>(functions, 'updateUserSetting');


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

  const updateCustomClaim = async (uid: string, newCustomClaim: CustomUserClaim): Promise<'success' | 'unauthenticated' | 'error'> => {
    try {
      const funcResult = await updateUserSetting({
        uid,
        customClaim: newCustomClaim,
      });

      const data = funcResult.data;
      switch(data.result) {
      case 'success': {
        const targetRows = rows.find(v => v.id === uid);
        if (targetRows === undefined || data.userRecord.customClaim === undefined) {
          throw new Error('Unreach');
        }
        targetRows.customClaim = data.userRecord.customClaim;
        return 'success';
      }
      case 'unauthenticated':
        return 'unauthenticated';
      case 'error':
        console.error(data.errorMessage);
        return 'error';
      }
    } catch (e) {
      console.error(e);
      return 'error';
    }
  };

  return {
    rows,
    selectedRow,

    setSelectedRow,

    updateCustomClaim,
  };
};

const UserEditorContainer = createContainer(userEditorContainer);
export default UserEditorContainer;
