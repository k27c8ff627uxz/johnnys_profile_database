import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
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
  name: null,
  furigana: null,
  dateOfBirth: null,
  bloodType: '',
  enterDate: {
    year: (new Date()).getFullYear(),
    month: 1,
    day: 1,
    unknownYear: false,
    unknownMonth: false,
    unknownDay: false,
  },
  retireDate: null,
};

interface AddUserEditorProps {
  onClose: () => void;
}

const AddUserEditor = (props: AddUserEditorProps) => {
  const { onClose } = props;
  const [value, setValue] = useState(initialValue);
  const [errorState, setErrorState] = useState<'error' | null>(null);
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
  
    if (name === null || furigana === null || dateOfBirth === null || bloodType === '') {
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
        onClose();
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
    <Stack spacing={3} sx={{m: 3}}>
      <MyErrorMessages
        errorState={errorState}
        texts={{
          error: ['実行中にエラーが発生しました。'],
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
    </Stack>
  );
};

export default AddUserEditor;
