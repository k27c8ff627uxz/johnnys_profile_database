import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  SxProps,
} from '@mui/material';
import { UncertainDate } from 'common/types/UncertainDate';

export interface UncertainDataPickerValue {
  year: number;
  month: number;
  day: number;
  unknownYear: boolean;
  unknownMonth: boolean;
  unknownDay: boolean;
}

export interface UncertainDatePickerProps {
  value: UncertainDataPickerValue;
  onChange: (v: UncertainDataPickerValue) => void;
  sx?: SxProps,
}

export function convertToUncertainDate(date: UncertainDataPickerValue): UncertainDate {
  if (date.unknownYear) {
    return {
      type: 'unknown',
    };
  }

  if (date.unknownMonth) {
    return {
      type: 'year_only',
      year: date.year,
    };
  }

  if (date.unknownDay) {
    return {
      type: 'year_month_only',
      year: date.year,
      month: date.month,
    };
  }

  return {
    type: 'exact',
    year: date.year,
    month: date.month,
    day: date.day,
  };
}

export function convertToUncertainDataPickerValue(udate: UncertainDate): UncertainDataPickerValue {
  switch(udate.type) {
  case 'unknown':
    return {
      year: (new Date()).getFullYear(),
      month: 1,
      day: 1,
      unknownYear: true,
      unknownMonth: true,
      unknownDay: true,
    };
  case 'year_only':
    return {
      year: udate.year,
      month: 1,
      day: 1,
      unknownYear: false,
      unknownMonth: true,
      unknownDay: true,
    };
  case 'year_month_only':
    return {
      year: udate.year,
      month: udate.month,
      day: 1,
      unknownYear: false,
      unknownMonth: false,
      unknownDay: true,
    };
  case 'exact':
    return {
      year: udate.year,
      month: udate.month,
      day: udate.day,
      unknownYear: false,
      unknownMonth: false,
      unknownDay: false,
    };
  }
}

// TODO: 無効な日(2/31など)を防ぐ処理
const UncertainDatePicker = (props: UncertainDatePickerProps) => {
  const { value, onChange, sx } = props;

  const unknownYear = value.unknownYear;
  const unknownMonth = unknownYear || value.unknownMonth;
  const unknownDay = unknownMonth || value.unknownDay;

  return (
    <Stack spacing={2} direction={{ sm: 'column', md: 'row' }} sx={sx} >
      <FormControl variant='standard' >
        <FormLabel>年</FormLabel>
        <Select
          value={value.year}
          onChange={e => onChange({...value, year: Number(e.target.value)})}
          disabled={unknownYear}
        >
          {[...Array(200)].map((_, i) => (
            <MenuItem value={i + 1900} key={i}>{i + 1900}</MenuItem>
          ))}
        </Select>
        <FormControlLabel
          control={<Checkbox checked={value.unknownYear} onChange={e => onChange({...value, unknownYear: e.target.checked})} />}
          label="年は不明"
        />
      </FormControl>
      <FormControl variant='standard' disabled={unknownYear}>
        <FormLabel>月</FormLabel>
        <Select
          value={value.month}
          onChange={e => onChange({...value, month: Number(e.target.value)})}
          disabled={unknownMonth}
        >
          {[...Array(12)].map((_, i) => (
            <MenuItem value={i + 1} key={i}>{i + 1}</MenuItem>
          ))}
        </Select>
        <FormControlLabel
          control={<Checkbox checked={value.unknownMonth} onChange={e => onChange({...value, unknownMonth: e.target.checked})} />}
          label="月は不明"
        />
      </FormControl>
      <FormControl variant='standard' disabled={unknownMonth}>
        <FormLabel>日</FormLabel>
        <Select
          value={value.month}
          onChange={e => onChange({...value, day: Number(e.target.value)})}
          disabled={unknownDay}
        >
          {[...Array(31)].map((_, i) => (
            <MenuItem value={i + 1} key={i}>{i + 1}</MenuItem>
          ))}
        </Select>
        <FormControlLabel
          control={<Checkbox checked={value.unknownDay} onChange={e => onChange({...value, unknownDay: e.target.checked})} />}
          label="日は不明"
        />
      </FormControl>
    </Stack>
  );
};

export default UncertainDatePicker;
