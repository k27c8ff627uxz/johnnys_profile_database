import React, { useState } from 'react';
import { Stack } from '@mui/material';
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
  onClose: () => void;
}

const UpdateUserEditor = (props: UpdateUserEditorProps) => {
  const { id, onClose } = props;
  const { profileList } = ProfileListContainer.useContainer();
  const profile = profileList.find(profile => profile.id === id);
  if (profile === undefined) {
    throw new Error('Unreach');
  }
  const [value, setValue] = useState<ProfileEditorValue>({
    name: profile.name,
    furigana: profile.furigana,
    dateOfBirth: profile.dateOfBirth,
    bloodType: profile.bloodType as 'A' | 'B' | 'O' | 'AB' | '',
    enterDate: convertToUncertainDataPickerValue(profile.enter),
    retireDate: profile.retire ? convertToUncertainDataPickerValue(profile.retire) : undefined,
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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
  
    if (!name || !furigana || !dateOfBirth || bloodType === '') {
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
    finishLoading();
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
          onSuccess={() => { setDeleteModalOpen(false); onClose(); }}
        />
      </MyModal>
    </Stack>
  );
};

export default UpdateUserEditor;
