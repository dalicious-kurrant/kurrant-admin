import React, {forwardRef} from 'react';
import styled from 'styled-components';

const SelectDatePicker = forwardRef(({value, onClick, inputType}, ref) => {
  return (
    <PannelButton onClick={onClick} ref={ref}>
      <SelectedDate>{value}</SelectedDate>
    </PannelButton>
  );
});

export default SelectDatePicker;

const PannelButton = styled.div`
  border: 1px solid #767676;
  background-color: #fff;
  border-radius: 5px;
  height: 40px;
  display: flex;
  justify-content: center;
  white-space: nowrap;
  align-items: center;
`;
const SelectedDate = styled.span`
  color: #767676;
  font-size: small;
  font-weight: 600;
  display: flex;
  padding: 0px 10px;
  width: max-content;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
