import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { getFunctions, HttpsCallableResult } from 'firebase/functions';
import { getProfileList } from 'utils/firebaseFunctions';
import FrameworkViewContainer from 'models/frameworkView';
import { GetProfileListResponse } from 'common/api/profile/getProfileList';
import { calcDuringSpan } from 'utils/functions';
import { Profile, Article } from './types';

const todayNewsContainer = () => {
  const { beginLoading, finishLoading, getToday } = FrameworkViewContainer.useContainer();

  const [profileList, setProfileList] = useState<Profile[]>([]);
  const [articleList, setArticleList] = useState<Article[]>([]);

  const functions = getFunctions();
  const today = getToday();

  useEffect(() => {
    (async () => {
      await reload();
    })();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [profileList, today]);

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
      const list = Object.values(funcRes.data.profileList)
        .map<Profile>(value => ({
          name: value.name,
          dateOfBirth: new Date(value.dateOfBirth),
          enter: value.enter,
          retire: value.retire,
        }))
        .sort((a, b) => b.dateOfBirth < a.dateOfBirth ? -1 : 1);
      setProfileList(list);
      break;
    }
    case 'error':
      console.error(funcRes.data.errorMessage);
    }

    finishLoading();
  };

  const applyFilter = () => {
    const list = profileList.flatMap(profile => {

      const isBelonging = calcDuringSpan(profile.enter, today, profile.retire);
      // 「今日」が、メンバーが入所前の日付かをチェック
      if (isBelonging === 'notStart') {
        return [];
      }

      // 「今日」はすでに退所しているか
      if (isBelonging === 'over') {
        return [];
      }

      const result: Article[] = [];

      // 誕生日の追加
      if (
        profile.dateOfBirth.getMonth() === today.getMonth() &&
        profile.dateOfBirth.getDate() === today.getDate()
      ) {
        result.push({
          type: 'birthday',
          name: profile.name,
          year: today.getFullYear() - profile.dateOfBirth.getFullYear(),
        });
      }

      // 入所日の追加
      if (
        profile.enter.type === 'exact' &&
        profile.enter.month === today.getMonth() + 1 &&
        profile.enter.day === today.getDate()
      ) {
        result.push({
          type: 'enterday',
          name: profile.name,
          year: today.getFullYear() - profile.enter.year,
        });
      }

      return result;
    });

    setArticleList(list);
  };

  return {
    articleList,
  };
};

const TodayNewsContainer = createContainer(todayNewsContainer);
export default TodayNewsContainer;
