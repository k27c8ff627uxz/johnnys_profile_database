import React, { useState } from 'react';
import { Box } from '@mui/material';
import { getFunctions } from 'firebase/functions';
import FrameworkViewContainer from 'models/frameworkView';
import { 
  convertToUncertainDate,
  ButtonWithProgress,
  MyErrorMessages,
} from 'utils/mycomponents';
import { initialUncertainDatePickerValue } from 'utils/mycomponents';
import { addProfile } from 'utils/firebaseFunctions';
import { dateToString } from 'common/utils/date';
import ProfileEditor, { ProfileEditorValue } from './ProfileEditor';

const initialValue: ProfileEditorValue = {
  name: undefined,
  furigana: undefined,
  dateOfBirth: null,
  bloodType: '',
  enterDate: initialUncertainDatePickerValue,
  retireDate: undefined,
  note: '',
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
    if (!value.name || !value.furigana || !value.dateOfBirth || !convertToUncertainDate(value.enterDate)) {
      return true;
    }

    if (isLoading) {
      return true;
    }

    return false;
  })();

  const onSubmit = async () => {
    const { name, furigana, dateOfBirth, bloodType, enterDate, retireDate, note } = value;
  
    const enter = convertToUncertainDate(enterDate);
    if (!name || !furigana || !dateOfBirth || !enter) {
      throw new Error('Unreach');
    }
  
    beginLoading();
    const functions = getFunctions();
    
    try {
      const apiResult = await addProfile(functions)({
        profile: {
          name,
          furigana,
          enter,
          note,
          bloodType: bloodType === '' ? undefined: bloodType,
          dateOfBirth: dateToString(dateOfBirth),
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
          error: ['?????????????????????????????????????????????'],
          unauthenticated: ['????????????????????????????????????????????????'],
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
          ??????
        </ButtonWithProgress>
      </Box>
    </Box>
  );
};

export default AddUserEditor;
