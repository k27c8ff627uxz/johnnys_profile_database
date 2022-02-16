import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { getFunctions } from 'firebase/functions';
import { getProfileList } from 'utils/firebaseFunctions';
import FrameworkViewContainer from 'models/frameworkView';
import { convertToRowItem } from './utils';
import { RowItem } from './types';

const profileListContainer = () => {
  const [profileList, setProfileList] = useState<RowItem[]>([]);
  const { beginLoading, finishLoading } = FrameworkViewContainer.useContainer();

  const functions = getFunctions();

  useEffect(() => {
    (async () => {
      try {
        beginLoading();
        const funcRes = await getProfileList(functions)();
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
      } catch(e) {
        console.error(e);
      } finally {
        finishLoading();
      }
    })();
  }, []);

  return {
    profileList,
  };
};

const ProfileListContainer = createContainer(profileListContainer);
export default ProfileListContainer;
