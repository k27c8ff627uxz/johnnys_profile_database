import React from 'react';
import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  SxProps,
  Switch,
} from '@mui/material';
import {
  DatePicker,
  LocalizationProvider,
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { UncertainDataPickerValue, UncertainDatePicker } from 'utils/mycomponents';

export interface ProfileEditorValue {
  name: string | null;
  furigana: string | null;
  dateOfBirth: Date | null;
  bloodType: 'A' | 'B' | 'O' | 'AB' | '';
  enterDate: UncertainDataPickerValue;
  retireDate: UncertainDataPickerValue | null;
}

interface ProfileEditorProps {
  value: ProfileEditorValue;
  onChange: (value: ProfileEditorValue) => void;
  sx?: SxProps;
}

const ProfileEditor = (props: ProfileEditorProps) => {
  const { value, onChange, sx } = props;

  const initRetire = (isRetire: boolean) => {
    if (isRetire) {
      onChange({
        ...value,
        retireDate: {
          year: (new Date()).getFullYear(),
          month: 1,
          day: 1,
          unknownYear: false,
          unknownMonth: false,
          unknownDay: false,
        },
      });
    } else {
      onChange({
        ...value,
        retireDate: null,
      });
    }
  };

  return (
    <Grid container spacing={6} sx={sx}>
      <Grid item lg={6} sm={12}>
        <TextField
          label='名前'
          variant='standard'
          fullWidth
          value={value.name}
          onChange={e => onChange({...value, name: e.target.value})}
        />
      </Grid>
      <Grid item lg={6} sm={12}>
        <TextField
          label='ふりがな'
          variant='standard'
          fullWidth
          value={value.furigana}
          onChange={e => onChange({...value, furigana: e.target.value})}
        />
      </Grid>
      <Grid item lg={4} md={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='誕生日'
            value={value.dateOfBirth}
            onChange={v => onChange({...value, dateOfBirth: v})}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item lg={3} md={6}>
        <FormControl variant='standard' sx={{width: '100px'}}>
          <InputLabel>血液型</InputLabel>
          <Select
            value={value.bloodType}
            onChange={e => onChange({...value, bloodType: e.target.value as 'A' | 'B' | 'O' | 'AB' | ''})}
          >
            <MenuItem value=''>-</MenuItem>
            <MenuItem value='A'>A</MenuItem>
            <MenuItem value='B'>B</MenuItem>
            <MenuItem value='O'>O</MenuItem>
            <MenuItem value='AB'>AB</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={5}>
        {/* spacing */}
      </Grid>
      <Grid item xs={12}>
        <Typography>入所日</Typography>
        <UncertainDatePicker value={value.enterDate} onChange={v => onChange({...value, enterDate: v})} />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch checked={value.retireDate !== null} onChange={v => initRetire(v.target.checked)} />
          }
          label={value.retireDate !== null ? '事務所退所済' : '事務所所属中'}
        />
        {value.retireDate !== null && (
          <>
            <Typography>退所日</Typography>
            <UncertainDatePicker value={value.retireDate} onChange={v => onChange({...value, retireDate: v})} />
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileEditor;
