import React from 'react';
import styled from 'styled-components';
import {handleFalsyValueToBlank} from 'utils/valueHandlingLogics';

const SelectInput = ({
  fieldsToOpen,
  registerStatus,
  input,
  name,
  setInput,
  placeholder,
  options,
  width = '100%',
  flex = 1,
  maxCharLength = 36,
}) => {
  const handleChange = e => {
    e.preventDefault();
    const {name, value} = e.target;

    if (registerStatus === 'register') {
      setInput({...input, [name]: value, id: Date.now().toString()});
    } else if (registerStatus === 'edit') {
      setInput({...input, [name]: value});
    } else {
      console.log(registerStatus);
    }
  };

  return (
    <>
      <Container flex={flex} width={width}>
        <TitleWrap>
          <Title>{fieldsToOpen[name]}</Title>
        </TitleWrap>

        <Select
          type="text"
          maxLength={maxCharLength}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          width={width}
          flex={flex}
          value={handleFalsyValueToBlank(input[name])}>
          <PlaceholderOption value="" disabled>
            {placeholder}
          </PlaceholderOption>

          {options.map((val, index) => {
            return (
              <Option key={index} value={val.value}>
                {val.name}
              </Option>
            );
          })}
        </Select>
      </Container>
    </>
  );
};
export default SelectInput;

const Container = styled.div`
  ${({flex}) => {
    if (flex) {
      return `flex:${flex};`;
    }
  }}

  ${({width}) => {
    if (width) {
      return `width:${width};`;
    }
  }}
`;

const TitleWrap = styled.div`
  background-color: ${props => props.theme.colors.grey[8]};
  padding: 0 1rem;

  height: 3rem;
  font-size: 1.2rem;
  /* text-align: center; */
  display: flex;
  align-items: center;
  /* border: 1px solid black; */
  border: 1px solid ${props => props.theme.colors.Grey07};
`;
const Title = styled.span`
  display: inline-block;
`;

const Select = styled.select`
  /* 화살표 디자인하기 */

  ${({width}) => {
    if (width) {
      return `width:${width};`;
    }
  }}
  ${({flex}) => {
    if (flex) {
      return `flex:${flex};`;
    }
  }}
    border: 1px solid ${props => props.theme.LightGray};
  padding: 0 0.7rem;

  font-size: 1.1rem;

  ${({marginLeft}) => {
    if (marginLeft) {
      return `margin-left: ${marginLeft};`;
    } else {
      return ``;
    }
  }};
  height: 3rem;
  &:focus {
    outline: none;
  }
`;

const Option = styled.option`
  border: none;
  /* height: 100%; */
  font-size: 1.2rem;
  /* color: ${props => props.theme.Black}; */
`;

const PlaceholderOption = styled(Option)`
  color: ${props => props.theme.Gray};
`;
