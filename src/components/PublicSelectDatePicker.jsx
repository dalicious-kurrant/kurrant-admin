import React, {forwardRef} from 'react';
import styled from 'styled-components';
import {formattedWeekDate} from 'utils/dateFormatter';

const PublicSelectDatePicker = forwardRef(
  ({value, onClick, inputType}, ref) => {
    console.log(value);
    return (
      <PannelButton onClick={onClick} ref={ref}>
        <SelectedDate>{formattedWeekDate(new Date(value))}</SelectedDate>
      </PannelButton>
    );
  },
);

export default PublicSelectDatePicker;

const PannelButton = styled.div`
  border: 1px solid #767676;
  background-color: #fff;
  border-radius: 5px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SelectedDate = styled.div`
  color: #767676;
  font-size: medium;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
