import React from 'react';
import {DateInput} from 'semantic-ui-calendar-react';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';
import {formattedDateZ} from 'utils/dateFormatter';

const DateRangePicker = ({startDate, endDate, setStartDate, setEndDate}) => {
  const handleDateChange = (_event, {name, value}) => {
    if (name === 'startDate') {
      setStartDate(value);
      if (endDate === null) {
        setEndDate(value);
      }
    } else if (name === 'endDate') {
      setEndDate(value);
      if (startDate === null) {
        setStartDate(value);
      }
    }
  };

  return (
    <RangeDatePickerWrap>
      <DateInput
        style={{fontSize: window.innerWidth < 768 ? 12 : 15}}
        name="startDate"
        placeholder="시작일"
        value={startDate ? formattedDateZ(startDate, '-') : startDate}
        iconPosition="left"
        onChange={handleDateChange}
        closable
        popupPosition="bottom left"
        dateFormat="YYYY-MM-DD"
        maxDate={endDate}
      />
      <span>-</span>
      <DateInput
        style={{fontSize: window.innerWidth < 768 ? 12 : 15}}
        name="endDate"
        placeholder="종료일"
        value={endDate ? formattedDateZ(endDate, '-') : null}
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
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;
