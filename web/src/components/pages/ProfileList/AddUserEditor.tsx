import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import FrameworkViewContainer from 'models/frameworkView';
import { ButtonWithProgress } from 'utils/mycomponents';
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

const AddUserEditor = () => {
  const [value, setValue] = useState(initialValue);
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

  const onSubmit = () => {
    beginLoading();
    console.log('Submit');
    finishLoading();
  };

  return (
    <Stack spacing={3} sx={{m: 3}}>
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
