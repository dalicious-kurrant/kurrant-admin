import React, { forwardRef } from 'react';
import styled from 'styled-components';

const SelectDatePicker = forwardRef(({ value, onClick, inputType }, ref) => {
  return (
    <PannelButton onClick={onClick} ref={ref}>
      <SelectedDate>{value}</SelectedDate>
    </PannelButton>
  );
});

export default SelectDatePicker;

const PannelButton = styled.div`
    border: 1px solid #767676;
    background-color: #767676;
    border-radius: 5px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SelectedDate = styled.div`
    color: white;
    font-size: small;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`