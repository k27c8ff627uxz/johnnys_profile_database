import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createContainer } from 'unstated-next';
import FrameworkViewContainer from 'models/frameworkView';
import { calcDuringSpan } from 'utils/functions';
import { Article } from './types';

const todayNewsContainer = () => {
  const { getToday, profileList } = FrameworkViewContainer.useContainer();
  const [searchParams] = useSearchParams();
  const [articleList, setArticleList] = useState<Article[] | null>(null);

  const today = getToday();

  // クエリの変化を取得するため、searchParamsを追加
  useEffect(() => {
    applyFilter();
  }, [profileList, searchParams]);

  const applyFilter = () => {
    if (profileList === null) {
      setArticleList(null);
      return;
    }
  
    const list = Object.values(profileList).flatMap(profile => {
      const dateOfBirth = new Date(profile.dateOfBirth);

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
        dateOfBirth.getMonth() === today.getMonth() &&
        dateOfBirth.getDate() === today.getDate()
      ) {
        result.push({
          type: 'birthday',
          name: profile.name,
          year: today.getFullYear() - dateOfBirth.getFullYear(),
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
