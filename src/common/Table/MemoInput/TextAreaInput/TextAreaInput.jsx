import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const TextAreaInput = ({
  input = {},
  name = '',
  onChange,
  placeholder = '',
  width = '100%',
  maxLength = 2000,
  height = '100%',
}) => {
  const [isBlur, setIsBlur] = useState(false);
  const [data, setData] = useState({});

  const handleChange = e => {
    e.preventDefault();
    const {name, value} = e.target;

    const yo = {...input};
    yo[name] = value;

    setData(yo);
  };

  useEffect(() => {
    if (isBlur) {
      onChange(data);
    }
  }, [isBlur]);

  useEffect(() => {
    setData(input);
  }, [input]);

  return (
    <TextArea
      name={name}
      required
      onChange={handleChange}
      value={data[name]}
      onFocus={() => {
        setIsBlur(false);
      }}
      onBlur={() => {
        setIsBlur(true);
      }}
      placeholder={placeholder}
      width={width}
      maxLength={maxLength}
      height={height}
    />
  );
};
export default TextAreaInput;

const TextArea = styled.textarea`
  display: inline-block;
  width: ${({width}) => width};
  height: ${({height}) => height};
  resize: none;
  overflow: hidden;
  outline: none;
  border: 0;
  font-size: 1.2rem;
  padding: 1rem 0.8rem;

  &::placeholder {
    color: ${props => props.theme.colors.Grey07};
  }

  &:hover {
    outline: none;
  }

  &:focus {
    overflow: auto;
    border: 2px solid ${props => props.theme.colors.Grey07};
  }
`;
