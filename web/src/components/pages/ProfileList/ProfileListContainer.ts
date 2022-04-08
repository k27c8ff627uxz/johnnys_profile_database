import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import FrameworkViewContainer from 'models/frameworkView';
import AccountContainer from 'models/account';
import { convertToRowItem } from './utils';
import { RowItem } from './types';
import { calcDuringSpan } from 'utils/functions';

const profileListContainer = () => {
  const [profileList, setProfileList] = useState<RowItem[]>([]);
  const [isShowRetireMember, setIsShowRetireMember] = useState(false);
  // TOOD: 列のID名が'columnData.tsx'と'ProfileHeader.tsx'と↓の３箇所にちらばっているので、まとめる
  const [visibleColumns, setVisibleColumns] = useState(['name', 'dateOfBirth', 'age', 'enter', 'retire', 'note']);
  const [searchText, setSearchText] = useState('');
  const frameworkViewStates = FrameworkViewContainer.useContainer();
  const { isLoading, getToday } = frameworkViewStates;
  const { authInfo } = AccountContainer.useContainer();

  const today = getToday();

  useEffect(() => {
    const rowItem = Object.entries(frameworkViewStates.profileList).map(([id, profile]) => 
      convertToRowItem(id, profile)
    );
    setProfileList(rowItem);
  }, [frameworkViewStates.profileList]);

  const reload = async () => {
    await frameworkViewStates.reloadProfileList();
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

    // まだ生まれていないメンバーをここではじく
    if (today < row.dateOfBirth) {
      return false;
    }

    // 検索フィルター
    if (searchText) {
      if (!`${row.name} ${row.furigana} ${row.note}`.includes(searchText)) {
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
