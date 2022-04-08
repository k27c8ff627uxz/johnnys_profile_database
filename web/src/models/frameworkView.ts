import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createContainer } from 'unstated-next';
import { getFunctions, HttpsCallableResult } from 'firebase/functions';
import { getNews } from 'utils/firebaseFunctions';
import { getProfileList } from 'utils/firebaseFunctions';
import { GetProfileListResponse } from 'common/api/profile/getProfileList';
import { Profile } from 'common/types/Profile';
import literals from 'utils/literals';

const frameworkViewContainer = () => {
  const [searchParams, setSeachParams] = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const [news, setNews] = useState<string[]>([]);
  const [isNewsLoading, setNewsLoading] = useState(false);
  const [profileList, setProfileList] = useState<{[id: string] : Profile}>({});
  const [isProfileListLoading, setProfileListLoading] = useState(false);

  const functions = getFunctions();

  useEffect(() => {
    (async () => {
      await reloadProfileList();
      await reloadNews();
    })();
  }, []);

  // Loading関連
  const beginLoading = () => setLoading(true);
  const finishLoading = () => setLoading(false);

  useEffect(() => {
    setLoading(isNewsLoading || isProfileListLoading);
  }, [isNewsLoading, isProfileListLoading]);

  // お知らせ関連
  const reloadNews = async () => {
    setNewsLoading(true);
    try {
      const result = await getNews(getFunctions())();
      setNews(result.data);
    } catch(e) {
      console.error(e);
    } finally {
      setNewsLoading(false);
    }
  };

  // Prifile関連
  const reloadProfileList = async () => {
    setProfileListLoading(true);
    let funcRes: HttpsCallableResult<GetProfileListResponse>;
    try {
      funcRes = await getProfileList(functions)();
    } catch(e) {
      console.error(e);
      setProfileListLoading(false);
      return;
    } 

    switch(funcRes.data.result) {
    case 'success': {
      setProfileList(funcRes.data.profileList);
      break;
    }
    case 'error':
      console.error(funcRes.data.errorMessage);
    }

    setProfileListLoading(false);
  };

  const [modalsOpen, setModalsOpen] = useState<{
    logout: boolean;
  }>({
    logout: false,
  });

  return {
    isLoading,
    beginLoading,
    finishLoading,

    // News
    news,

    // Profiles
    reloadProfileList,
    profileList,
  
    // modals
    modalsOpen,
    setModalsOpen,
  
    // QueryParams
    existsQueryParams: (param: string) => {
      return searchParams.get(param) !== null;
    },
    setQueryParams: (name: string, value: string) => {
      searchParams.set(name, value);
      setSeachParams(searchParams);
    },
    resetQueryParams: (name: string) => {
      searchParams.delete(name);
      setSeachParams(searchParams);
    },
    generateQueryParams: () => {
      const today = searchParams.get(literals.queryParam.today);
      if (today === null) {
        return '';
      }
      return `?${literals.queryParam.today}=${today}`;
    },

    // utils
    getToday: () => {
      const paramToday = searchParams.get(literals.queryParam.today);
      if (!paramToday) {
        return new Date();
      }
    
      // スマホ版だとnew Date()の挙動が違うみたいなので、変換
      // TODO: 正規構文を使ったReplace
      return new Date(paramToday.replace('.', '/').replace('.', '/'));
    },

  };
};

const FrameworkViewContainer = createContainer(frameworkViewContainer);
export default FrameworkViewContainer;
