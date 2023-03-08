import styled from 'styled-components';
import {
  DEFAULT_INPUT_BORDER,
  DEFAULT_INPUT_BORDER_COLOR,
  DEFAULT_BORDER_RADIUS,
  NEUTRAL_COLOR_1,
  PRIMARY_COLOR_5,
  PRIMARY_COLOR_6,
  DANGER_COLOR,
  DUST_RED_4,
} from '../../../shared/recommendation-constants';

const containerStyle = `
  box-sizing: border-box;
  border: ${DEFAULT_INPUT_BORDER};
  border-radius: ${DEFAULT_BORDER_RADIUS};
  padding: 4px 12px;

  &::placeholder {
    color: ${DEFAULT_INPUT_BORDER_COLOR};
  }
`;

const containerHoverFocusStyle = `
  &:not([disabled]):hover, &:not([disabled]):focus {
    outline-color: ${PRIMARY_COLOR_5};
    border-color: ${PRIMARY_COLOR_5};
    background-color: ${NEUTRAL_COLOR_1};
  }
`;
const containerHoverFocusPrimaryStyle = `
  &:not([disabled]):hover, &:not([disabled]):focus {
    outline-color: ${PRIMARY_COLOR_6};
    border-color: ${PRIMARY_COLOR_6};
    background-color: ${PRIMARY_COLOR_5};
  }
`;
const containerHoverFocusDangerStyle = `
  &:not([disabled]):hover, &:not([disabled]):focus {
    outline-color: ${DANGER_COLOR};
    border-color: ${DANGER_COLOR};
    background-color: ${DUST_RED_4};
  }
`;

const StyledInput = styled.input`
  ${containerStyle}
  ${containerHoverFocusStyle}
`;

export const StyledInputText = styled(StyledInput).attrs({type: 'text'})``;

export const StyledInputSearch = styled(StyledInputText)`
  width: 100%;
  background: url(${'/assets/images/search.svg'}) no-repeat right center;
  background-size: 24px;
  padding-right: 24px;
`;

export const StyledInputDate = styled(StyledInput).attrs({type: 'date'})`
  ::-webkit-calendar-picker-indicator {
    color: ${DEFAULT_INPUT_BORDER_COLOR};
  }
`;

export const StyledSelect = styled.select`
  ${containerStyle}
  ${containerHoverFocusStyle}
`;

export const StyledPrimaryButton = styled.button`
  ${containerStyle}
  ${containerHoverFocusPrimaryStyle}

  background-color: ${PRIMARY_COLOR_6};
  color: ${NEUTRAL_COLOR_1};
`;

export const StyledSecondaryButton = styled.button`
  ${containerStyle}
  ${containerHoverFocusStyle}

  background-color: ${NEUTRAL_COLOR_1};
`;

export const StyledDangerButton = styled.button`
  ${containerStyle}
  ${containerHoverFocusDangerStyle}

  background-color: ${DANGER_COLOR};
  color: ${NEUTRAL_COLOR_1};
`;

export const InputCheckbox = styled.input.attrs({type: 'checkbox'})`
  ${containerStyle}

  appearance: none;
  width: 16px;
  height: 16px;
  padding: 0px;
  margin: 6px;

  &:checked {
    background-color: ${PRIMARY_COLOR_5};
    border-color: transparent;
  }

  &:hover {
    border-color: ${PRIMARY_COLOR_6};
  }
`;
