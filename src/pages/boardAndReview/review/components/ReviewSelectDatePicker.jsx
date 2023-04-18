import React, {forwardRef} from 'react';
import styled from 'styled-components';

const ReviewSelectDatePicker = forwardRef(
  ({value, onClick, inputType}, ref) => {
    return (
      <PannelButton onClick={onClick} ref={ref}>
        <SelectedDate>{value ? value : '날짜 선택'}</SelectedDate>
      </PannelButton>
    );
  },
);

export default ReviewSelectDatePicker;

const PannelButton = styled.div`
  border: 1px solid #767676;
  background-color: #fff;
  border-radius: 5px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SelectedDate = styled.span`
  color: #767676;
  font-size: small;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
