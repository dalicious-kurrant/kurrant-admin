import styled from 'styled-components';

import CheckIcon from 'assets/svg/CheckIcon.svg';

import {useState} from 'react';
import {splitNumberAndUnit} from 'utils/valueHandlingLogics';
import {useEffect} from 'react';
import Image from 'common/Image';

const ReviewCheckbox = ({
  width,
  height,
  css,
  value = undefined,
  checked,
  checkboxStatus = true,
  onChecked,
  disabled,
}) => {
  const handleClick = () => {
    onChecked(value);
  };

  return (
    <Container
      css={css}
      // checked={true}
      checked={checked}
      width={width}
      height={height}
      disabled={disabled}
      onClick={handleClick}>
      {/* {false && <Image src={CheckIcon} width={'100%'} height={'100%'} />} */}
      {(disabled || checked) && (
        <Image src={CheckIcon} width={'100%'} height={'100%'} />
      )}
    </Container>
  );
};

export default ReviewCheckbox;

const Container = styled.button`
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};

  width: ${({width}) => width};
  height: ${({height}) => height};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({css}) => css}
  ${({checked, theme}) => {
    if (!checked) {
      return `border: 2px solid ${theme.colors.grey[7]};`;
    }
  }}

  border-radius: ${({width, height}) => {
    const {number: widthValue, unit} = splitNumberAndUnit(width);
    const {number: heightValue, _} = splitNumberAndUnit(height);

    return `${(widthValue + heightValue) / 8}${unit}`;
  }};
  background-color: ${props =>
    props.disabled || props.checked
      ? props.theme.colors.blue[600]
      : 'transparent'};
`;
