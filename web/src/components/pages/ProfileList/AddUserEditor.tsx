import React, { useState } from 'react';
import { Box } from '@mui/material';
import { getFunctions } from 'firebase/functions';
import FrameworkViewContainer from 'models/frameworkView';
import { 
  convertToUncertainDate,
  ButtonWithProgress,
  MyErrorMessages,
} from 'utils/mycomponents';
import { addProfile } from 'utils/firebaseFunctions';
import { dateToString } from 'common/utils/date';
import ProfileEditor, { ProfileEditorValue } from './ProfileEditor';

const initialValue: ProfileEditorValue = {
  name: undefined,
  furigana: undefined,
  dateOfBirth: undefined,
  bloodType: '',
  enterDate: {
    year: (new Date()).getFullYear(),
    month: 1,
    day: 1,
    unknownYear: false,
    unknownMonth: false,
    unknownDay: false,
  },
  retireDate: undefined,
};

interface AddUserEditorProps {
  onSuccess: () => void;
}

const AddUserEditor = (props: AddUserEditorProps) => {
  const { onSuccess } = props;
  const [value, setValue] = useState(initialValue);
  const [errorState, setErrorState] = useState<'error' | 'unauthenticated' | null>(null);
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();

  const verify = (() => {
    if (!value.name || !value.furigana || !value.dateOfBirth || !value.bloodType) {
      return true;
    }

    if (isLoading) {
      return true;
    }

    return false;
  })();

  const onSubmit = async () => {
    const { name, furigana, dateOfBirth, bloodType, enterDate, retireDate } = value;
  
    if (!name || !furigana || !dateOfBirth || bloodType === '') {
      throw new Error('Unreach');
    }
  
    beginLoading();
    const functions = getFunctions();
    
    try {
      const apiResult = await addProfile(functions)({
        profile: {
          name,
          furigana,
          bloodType,
          dateOfBirth: dateToString(dateOfBirth),
          enter: convertToUncertainDate(enterDate),
          retire: retireDate ? convertToUncertainDate(retireDate) : undefined,
        },
      });

      const data = apiResult.data;
      switch(data.result) {
      case 'success':
        setErrorState(null);
        onSuccess();
        break;
      case 'unauthenticated':
        setErrorState('unauthenticated');
        break;
      case 'error':
        setErrorState('error');
        console.error(data.errorMessage);
        break;
      }
      
    } catch(e) {
      setErrorState('error');
      console.error(e);
    } finally {
      finishLoading();
    }
  };

  return (
    <Box sx={{p: 3}}>
      <MyErrorMessages
        errorState={errorState}
        texts={{
          error: ['実行中にエラーが発生しました。'],
          unauthenticated: ['データを編集する権限がありません'],
        }}
      />
      <ProfileEditor value={value} onChange={v => setValue(v)} />
      <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <ButtonWithProgress
          type='submit'
          variant='contained'
          disabled={verify}
          isLoading={isLoading}
          onClick={() => onSubmit()}
        >
          登録
        </ButtonWithProgress>
      </Box>
    </Box>
  );
};

export default AddUserEditor;
