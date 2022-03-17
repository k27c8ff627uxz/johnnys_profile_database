import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { getFunctions, HttpsCallableResult } from 'firebase/functions';
import { getProfileList } from 'utils/firebaseFunctions';
import FrameworkViewContainer from 'models/frameworkView';
import AccountContainer from 'models/account';
import { convertToRowItem } from './utils';
import { RowItem } from './types';
import { calcDuringSpan } from 'utils/functions';
import { GetProfileListResponse } from 'common/api/profile/getProfileList';

const profileListContainer = () => {
  const [profileList, setProfileList] = useState<RowItem[]>([]);
  const [isShowRetireMember, setIsShowRetireMember] = useState(false);
  // TOOD: 列のID名が'columnData.tsx'と'ProfileHeader.tsx'と↓の３箇所にちらばっているので、まとめる
  const [visibleColumns, setVisibleColumns] = useState(['name', 'dateOfBirth', 'age', 'enter', 'retire', 'note']);
  const [searchText, setSearchText] = useState('');
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

    const isBlonging = calcDuringSpan(row.enter, today, row.retire);
    // 「今日」が、メンバーが入所前の日付かをチェック
    if (isBlonging === 'notStart') {
      return false;
    }

    // 「退所メンバーも表示する」にチェックがなかった場合
    if (!isShowRetireMember) {
      if (isBlonging === 'over') {
        return false;
      }
    }

    // 検索フィルター
    if (searchText) {
      if (!`${row.name} ${row.furigana}`.includes(searchText)) {
        return false;
      }
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
    isShowRetireMember,
    visibleColumns,
    searchText,
    profileList,
    isLoading,
    editable,
    setIsShowRetireMember,
    setVisibleColumns,
    setSearchText,
    reload,
    applySort,
    applyFilter,
  };
};

const ProfileListContainer = createContainer(profileListContainer);
export default ProfileListContainer;
