import React from 'react';
import {
  Box,
  MenuItem,
  Select,
  Stack,
  SxProps,
  TextField,
} from '@mui/material';
import {
  DatePicker,
  LocalizationProvider,
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { UncertainDate, UncertainDateType } from 'common/types/UncertainDate';

export interface UncertainDataPickerValue {
  type: UncertainDateType;
  date: Date | null
  yearMonth: Date | null;
  year: Date | null;
}

export const initialUncertainDatePickerValue: UncertainDataPickerValue = {
  type: 'unknown',
  date: null,
  yearMonth: null,
  year: null,
};

export interface UncertainDatePickerProps {
  value: UncertainDataPickerValue;
  onChange: (v: UncertainDataPickerValue) => void;
  sx?: SxProps,
}

export function convertToUncertainDate(data: UncertainDataPickerValue): UncertainDate | undefined {
  switch(data.type) {
  case 'unknown':
    return {
      type: 'unknown',
    };
  case 'year_only': {
    const year = data.year?.getFullYear();
    if (!year) {
      return undefined;
    }
    return {
      year,
      type: 'year_only',
    };
  }
  case 'year_month_only': {
    const date = data.yearMonth;
    if (!date) {
      return undefined;
    }
    return {
      type: 'year_month_only',
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    };
  }
  case 'exact': {
    const date = data.date;
    if (!date) {
      return undefined;
    }
    return {
      type: 'exact',
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }
  }
}

export function convertToUncertainDataPickerValue(udate: UncertainDate): UncertainDataPickerValue {
  switch(udate.type) {
  case 'unknown':
    return {
      type: 'unknown',
      year: null,
      yearMonth: null,
      date: null,
    };
  case 'year_only':
    return {
      type: 'year_only',
      year: new Date(udate.year, 0, 1),
      yearMonth: new Date(udate.year, 0, 1),
      date: new Date(udate.year, 0, 1),
    };
  case 'year_month_only':
    return {
      type: 'year_month_only',
      year: new Date(udate.year, 0, 1),
      yearMonth: new Date(udate.year, udate.month - 1, 1),
      date: new Date(udate.year, udate.month - 1, 1),
    };
  case 'exact':
    return {
      type: 'exact',
      year: new Date(udate.year, 0, 1),
      yearMonth: new Date(udate.year, udate.month - 1, 1),
      date: new Date(udate.year, udate.month - 1, udate.day),
    };
  }
}

const UncertainDatePicker = (props: UncertainDatePickerProps) => {
  const { value, onChange, sx } = props;

  const choiceBody = (uType: UncertainDateType) => {
    switch (uType) {
    case 'unknown':
      return <React.Fragment></React.Fragment>;
    case 'year_only':
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={['year']}
            value={value.year}
            onChange={v => onChange({...value, year: v ?? null})}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      );
    case 'year_month_only':
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={['year', 'month']}
            value={value.yearMonth}
            onChange={v => onChange({...value, yearMonth: v ?? null})}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      );
    case 'exact':
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={value.date}
            onChange={v => onChange({...value, date: v ?? null})}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      );
    }
  };

  return (
    <Stack spacing={2} direction='column' sx={sx}>
      <Select
        value={value.type}
        sx={{width: '200px'}}
        onChange={e => onChange({...value, type: e.target.value as UncertainDateType})}
      >
        <MenuItem value='unknown'>不明</MenuItem>
        <MenuItem value='year_only'>年だけ分かる</MenuItem>
        <MenuItem value='year_month_only'>年と月が分かる</MenuItem>
        <MenuItem value='exact'>年と月と日が分かる</MenuItem>
      </Select>
      <Box>
        {choiceBody(value.type)}
      </Box>
    </Stack>
  );
};

export default UncertainDatePicker;
