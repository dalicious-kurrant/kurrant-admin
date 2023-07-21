import React, {useState} from 'react';
import {DateInput} from 'semantic-ui-calendar-react';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';
import { formattedDateZ } from 'utils/dateFormatter';

const DateRangePicker = ({startDate, endDate, setStartDate, setEndDate}) => {
  const handleDateChange = (_event, {name, value}) => {
    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
  };

  return (
    <RangeDatePickerWrap>
      <DateInput
        name="startDate"
        placeholder="시작일"
        value={formattedDateZ(startDate,"-")}
        iconPosition="left"
        onChange={handleDateChange}
        closable
        popupPosition="bottom left"
        dateFormat="YYYY-MM-DD"
        maxDate={endDate}
      />
      <span>-</span>
      <DateInput
        name="endDate"
        placeholder="종료일"
        value={formattedDateZ(endDate,"-")}
        iconPosition="left"
        onChange={handleDateChange}
        closable
        popupPosition="bottom left"
        dateFormat="YYYY-MM-DD"
        minDate={startDate}
      />
    </RangeDatePickerWrap>
  );
};

export default DateRangePicker;

const RangeDatePickerWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
