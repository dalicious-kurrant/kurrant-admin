import styled from 'styled-components';

const RadioInput = ({
  children,
  value,
  name,
  defaultChecked,
  disabled,
  onChange,
}) => {
  return (
    <Label>
      <input
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={e => {
          onChange(e);
        }}
      />
      {children}
    </Label>
  );
};
export default RadioInput;

const Label = styled.label`
  margin-right: 4px;
`;
