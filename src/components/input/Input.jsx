import React, {useState, forwardRef} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import styled, {css} from 'styled-components';

/**
 *
 * @param {object} props
 * @param {object} props.rules
 * @param {string} props.name
 * @param {string} props.placeholder
 * @param {boolean} props.isEditable
 * @param {boolean} props.isPassword
 * @param {boolean} props.focus
 * @param {function} props.setFocused
 * @param {object} props.suffix
 * @param {boolean} props.suffix.isNeedDelete
 * @param {number} props.suffix.timer
 * @param {number} props.suffix.isAuth
 * @param {number} props.suffix.authText
 * @param {function} props.suffix.authPressEvent
 * @param {string} props.label
 * @param {string} props.errMsg
 * @param {object} props.style
 *
 * @returns
 */
const Input = forwardRef(
  (
    {
      name,
      width = '100px',
      placeholder = '',
      isEditable = true,
      isPassword = false,
      padding = '4px 8px',
      setisFocused,
      label = '',
      caption = '',
      errMsg = '',
      defaultValue,
      style,
      ...rest
    },
    ref,
  ) => {
    // Hook
    const {
      control,
      watch,
      formState: {errors},
    } = useFormContext();

    const [focus, setFocused] = useState(false);

    // Props
    const containerProps = {
      editable: isEditable,
    };

    const textInputProps = {
      placeholder,
      autoComplete: 'off',
      editable: isEditable,
    };

    return (
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue && defaultValue}
        render={({field: {onChange, value}}) => {
          return (
            <Wrapper {...style}>
              {/* label */}
              <LabelContainer>{label}</LabelContainer>
              {/* TextInput */}
              <ControlContainer
                isEditable={isEditable}
                isError={errors[name]}
                {...containerProps}
                focus={focus}>
                <InputContainer>
                  <StyledTextInput
                    widths={width}
                    paddings={padding}
                    ref={ref && ref}
                    {...textInputProps}
                    onChange={onChange}
                    onBlur={() => {
                      setFocused(false);
                      if (setisFocused) {
                        setisFocused(false);
                      }
                    }}
                    onFocus={() => {
                      setFocused(true);
                      if (setisFocused) {
                        setisFocused(true);
                      }
                    }}
                    text={'InputText'}
                    value={value || ''}
                    {...rest}
                  />
                </InputContainer>
              </ControlContainer>
            </Wrapper>
          );
        }}
      />
    );
  },
);

// Wrapper
const Wrapper = styled.div`
  /* width: 100%; */
`;

// Label
const LabelContainer = styled.p`
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 12px;
`;

// TextInput
const ControlContainer = styled.div`
  position: relative;
  /* width: 150px; */

  //justify-content: space-between;
`;

const InputContainer = styled.div``;

const StyledTextInput = styled.input`
  /* width: 100%; */
  margin-right: 10px;
  height: 30px;
  border: 0.5px solid #c8c8d2;
  border-radius: 4px;
  padding: ${({paddings}) => paddings && paddings};
  width: ${({widths}) => widths && widths};
  ${({editable}) => {
    if (!editable) {
      return css`
        color: black;
        padding-right: 0px;
      `;
    }
  }}
`;

export default Input;
