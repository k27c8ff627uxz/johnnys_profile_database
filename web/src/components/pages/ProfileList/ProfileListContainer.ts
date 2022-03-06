import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { getFunctions, HttpsCallableResult } from 'firebase/functions';
import { getProfileList } from 'utils/firebaseFunctions';
import FrameworkViewContainer from 'models/frameworkView';
import AccountContainer from 'models/account';
import { convertToRowItem } from './utils';
import { RowItem } from './types';
import { sortUncertainDate } from 'utils/functions';
import { dateToUncertainDate } from 'common/utils/date';
import { GetProfileListResponse } from 'common/api/profile/getProfileList';

const profileListContainer = () => {
  const [profileList, setProfileList] = useState<RowItem[]>([]);
  const { isLoading, beginLoading, finishLoading, getToday } = FrameworkViewContainer.useContainer();
  const { authInfo } = AccountContainer.useContainer();

  const functions = getFunctions();
  const today = getToday();

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

  const applySort = (compareFunc: (item1: RowItem, item2: RowItem) => number) => {
    profileList.sort(compareFunc);
    setProfileList(profileList);
  };

  const applyFilter = (row: RowItem) => {

    // 「今日」が、メンバーが入所前の日付かをチェック
    if (sortUncertainDate('desc', row.enter, dateToUncertainDate(today)) < 0) {
      return false;
    }

    return true;
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
    applySort,
    applyFilter,
  };
};

const ProfileListContainer = createContainer(profileListContainer);
export default ProfileListContainer;
