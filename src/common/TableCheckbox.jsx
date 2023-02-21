import styled from 'styled-components';

import CheckIcon from 'assets/svg/CheckIcon.svg';
import Image from './Image';
import {useState} from 'react';
import {splitNumberAndUnit} from 'utils/valueHandlingLogics';
import {useEffect} from 'react';

const TableCheckbox = ({
  width,
  height,
  css,
  value = undefined,
  checkboxStatus,
  onChecked,
}) => {
  // const [checked, setChecked] = useState(false);
  // const [valueHold, setValueHold] = useState(undefined);

  // useEffect(() => {
  //   setValueHold(value);
  // }, [value]);

  // useEffect(() => {
  //   if (onChecked) {
  //     onChecked();
  //   }
  // }, [onChecked]);

  const handleClick = () => {
    onChecked(value);
  };

  return (
    <Container
      css={css}
      // checked={true}
      checked={checkboxStatus[value]}
      width={width}
      height={height}
      onClick={handleClick}>
      {false && <Image src={CheckIcon} width={'70%'} height={'70%'} />}
      {checkboxStatus[value] && (
        <Image src={CheckIcon} width={'70%'} height={'70%'} />
      )}
    </Container>
  );
};

export default TableCheckbox;

const Container = styled.div`
  width: ${({width}) => width};
  height: ${({height}) => height};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({css}) => css}
  ${({checked, theme}) => {
    if (!checked) {
      return `border: 2px solid ${theme.colors.Grey04};`;
    }
  }}

  border-radius: ${({width, height}) => {
    const {number: widthValue, unit} = splitNumberAndUnit(width);
    const {number: heightValue, _} = splitNumberAndUnit(height);

    return `${(widthValue + heightValue) / 8}${unit}`;
  }};
  background-color: ${props =>
    props.checked ? props.theme.colors.Blue04 : 'transparent'};
`;
