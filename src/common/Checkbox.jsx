import styled from 'styled-components';

import CheckIcon from 'assets/svg/CheckIcon.svg';
import Image from './Image';
import {useState} from 'react';
import {splitNumberAndUnit} from 'utils/valueHandlingLogics';

const Checkbox = ({width, height, css}) => {
  const [checked, setChecked] = useState(false);

  return (
    <Container
      css={css}
      checked={checked}
      width={width}
      height={height}
      onClick={() => {
        setChecked(!checked);
      }}>
      {checked && <Image src={CheckIcon} width={'70%'} height={'70%'} />}
    </Container>
  );
};

export default Checkbox;

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
