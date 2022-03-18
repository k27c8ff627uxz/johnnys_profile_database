import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createContainer } from 'unstated-next';
import literals from 'utils/literals';

const frameworkViewContainer = () => {
  const [searchParams, setSeachParams] = useSearchParams();
  const [isLoading, setLoading] = useState(false);

  const [modalsOpen, setModalsOpen] = useState<{
    logout: boolean;
  }>({
    logout: false,
  });

  return {
    isLoading,
    beginLoading: () => { setLoading(true); },
    finishLoading: () => { setLoading(false); },

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
      const searchParams = useSearchParams()[0];
    
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
