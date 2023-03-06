import styled from 'styled-components';
import {InputCheckbox} from '../ui/inputs';

const StyledListItem = styled.label`
  display: flex;
  flex-direction: rows;
  margin: 0px;
  padding: 6px 12px;
  font-size: 14px;
  align-items: center;
  ${props => props.isChecked && 'background-color: #e6f7ff'}
`;

const CheckboxItem = ({name, value, label, isChecked, onChange}) => {
  return (
    <StyledListItem isChecked={isChecked}>
      <InputCheckbox
        name={name}
        value={value}
        checked={isChecked}
        onChange={onChange}
      />
      {label}
    </StyledListItem>
  );
};

export default CheckboxItem;
