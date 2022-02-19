import React, { useState } from 'react';
import ProfileEditor, { ProfileEditorValue } from './ProfileEditor';

const initialValue: ProfileEditorValue = {
  name: null,
  furigana: null,
  dateOfBirth: null,
  bloodType: null,
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
  return (
    <ProfileEditor value={value} onChange={v => setValue(v)} sx={{p: 4}} />
  );
};

export default AddUserEditor;
