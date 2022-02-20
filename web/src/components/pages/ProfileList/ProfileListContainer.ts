import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { getFunctions, HttpsCallableResult } from 'firebase/functions';
import { getProfileList } from 'utils/firebaseFunctions';
import FrameworkViewContainer from 'models/frameworkView';
import AccountContainer from 'models/account';
import { convertToRowItem } from './utils';
import { RowItem } from './types';
import { GetProfileListResponse } from 'common/api/profile/getProfileList';

const profileListContainer = () => {
  const [profileList, setProfileList] = useState<RowItem[]>([]);
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const { authInfo } = AccountContainer.useContainer();

  const functions = getFunctions();

  useEffect(() => {
    (async () => {
      await reload();
    })();
  }, []);

  const reload = async () => {
    beginLoading();
    let funcRes: HttpsCallableResult<GetProfileListResponse>;
    try {
      funcRes = await getProfileList(functions)();
    } catch(e) {
      console.error(e);
      finishLoading();
      return;
    } 

    switch(funcRes.data.result) {
    case 'success': {
      const rowItem = Object.entries(funcRes.data.profileList).map(([id, profile]) => 
        convertToRowItem(id, profile)
      );
      setProfileList(rowItem);
      break;
    }
    case 'error':
      console.error(funcRes.data.errorMessage);
    }

    finishLoading();
  };

  const editable = (() => {
    if (authInfo.state !== 'login') {
      return false;
    }

    return authInfo.customClaim.role.editData;
  })();

  return {
    profileList,
    isLoading,
    editable,
    reload,
  };
};

const ProfileListContainer = createContainer(profileListContainer);
export default ProfileListContainer;
