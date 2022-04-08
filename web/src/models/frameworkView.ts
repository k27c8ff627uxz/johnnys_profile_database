import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createContainer } from 'unstated-next';
import { getFunctions, HttpsCallableResult } from 'firebase/functions';
import { getProfileList } from 'utils/firebaseFunctions';
import { GetProfileListResponse } from 'common/api/profile/getProfileList';
import { Profile } from 'common/types/Profile';
import literals from 'utils/literals';

const frameworkViewContainer = () => {
  const [searchParams, setSeachParams] = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const [profileList, setProfileList] = useState<{[id: string] : Profile}>({});

  const functions = getFunctions();

  useEffect(() => {
    (async () => {
      await reloadProfileList();
    })();
  }, []);

  // Loading関連
  const beginLoading = () => setLoading(true);
  const finishLoading = () => setLoading(false);

  // Prifile関連
  const reloadProfileList = async () => {
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
      setProfileList(funcRes.data.profileList);
      break;
    }
    case 'error':
      console.error(funcRes.data.errorMessage);
    }

    finishLoading();
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
