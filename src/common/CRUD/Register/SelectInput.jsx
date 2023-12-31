import React from 'react';
import styled from 'styled-components';

const SelectInput = ({
  fieldsToOpen,
  fieldName,
  registerStatus,
  input,
  name,
  setInput,
  placeholder,
  options,
  width = '100%',
  flex = 1,
  headerWidth = undefined,
  valueType = 'string',
  maxCharLength = 36,
  defaultValue,
}) => {
  const handleChange = e => {
    e.preventDefault();
    const {name, value} = e.target;

    if (registerStatus === 'register') {
      setInput({
        ...input,
        [name]: valueType === 'string' ? value : parseInt(value),
        id: Date.now().toString(),
      });
    } else if (registerStatus === 'edit') {
      setInput({...input, [name]: value});
    } else {
      console.log(registerStatus);
    }
  };

  return (
    <>
      <Container flex={flex} width={width}>
        <TitleWrap style={headerWidth ? {width: headerWidth} : undefined}>
          <Title>{fieldName}</Title>
        </TitleWrap>

        <Select
          type="text"
          maxLength={maxCharLength}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          width={width}
          flex={flex}
          // defaultValue={defaultValue.value}
          value={input[name]}>
          {/* <Option value={defaultValue.value} disabled>
            필수 선택
          </Option> */}
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
  display: flex;
  align-items: center;
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
  font-size: 1.2rem;
`;


