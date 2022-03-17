import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { getFunctions } from 'firebase/functions';
import FrameworkViewContainer from 'models/frameworkView';
import { 
  convertToUncertainDate,
  ButtonWithProgress,
  MyModal,
  MyErrorMessages,
} from 'utils/mycomponents';
import { updateProfile } from 'utils/firebaseFunctions';
import { convertToUncertainDataPickerValue } from 'utils/mycomponents';
import { dateToString } from 'common/utils/date';
import ProfileListContainer from './ProfileListContainer';
import DeleteProfileConfirm from './DeleteProfileConfirm';
import ProfileEditor, { ProfileEditorValue } from './ProfileEditor';

interface UpdateUserEditorProps {
  id: string;
  onSuccess: () => void;
}

const UpdateUserEditor = (props: UpdateUserEditorProps) => {
  const { id, onSuccess } = props;
  const { profileList } = ProfileListContainer.useContainer();
  const profile = profileList.find(profile => profile.id === id);
  if (profile === undefined) {
    throw new Error('Unreach');
  }
  const [value, setValue] = useState<ProfileEditorValue>({
    name: profile.name,
    furigana: profile.furigana,
    dateOfBirth: profile.dateOfBirth,
    bloodType: profile.bloodType ?? '' as 'A' | 'B' | 'O' | 'AB' | '',
    enterDate: convertToUncertainDataPickerValue(profile.enter),
    retireDate: profile.retire ? convertToUncertainDataPickerValue(profile.retire) : undefined,
    note: profile.note,
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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
      const apiResult = await updateProfile(functions)({
        id,
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
    finishLoading();
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
      <Stack direction='row' justifyContent='flex-end' spacing={2}>
        <ButtonWithProgress
          type='submit'
          variant='contained'
          color='error'
          disabled={isLoading}
          isLoading={isLoading}
          onClick={() => setDeleteModalOpen(true) }
        >
          削除
        </ButtonWithProgress>
        <ButtonWithProgress
          type='submit'
          variant='contained'
          disabled={verify}
          isLoading={isLoading}
          onClick={() => onSubmit()}
        >
          変更
        </ButtonWithProgress>
      </Stack>
      <MyModal
        isLoading={isLoading}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title='メンバーの削除'
      >
        <DeleteProfileConfirm
          id={id}
          deletingName={profile.name}
          onClose={() => setDeleteModalOpen(false)}
          onSuccess={() => { setDeleteModalOpen(false); onSuccess(); }}
        />
      </MyModal>
    </Box>
  );
};

export default UpdateUserEditor;
