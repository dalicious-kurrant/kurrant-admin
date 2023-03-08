import {useState} from 'react';
import styled from 'styled-components';
import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_DIVIDER_BORDER,
  DEFAULT_INPUT_BORDER,
} from '../../../shared/recommendation-constants';
import {StyledInputSearch} from '../ui/inputs';
import CheckboxItem from './CheckboxItem';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: ${DEFAULT_INPUT_BORDER};
  border-radius: ${DEFAULT_BORDER_RADIUS};
`;

const StyledHeaderContainer = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  border-bottom: ${DEFAULT_DIVIDER_BORDER};
`;

const StyledSearchBoxContainer = styled.div`
  height: 56px;
  padding: 12px;
`;

const StyledListContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const CheckboxList = ({
  header,
  name,
  items,
  idPicker,
  valuePicker,
  labelPicker,
  checkedItems,
  setCheckedItems,
}) => {
  const [keyword, setKeyword] = useState('');

  const keywordChangeHandler = e => {
    setKeyword(e.target.value);
  };

  const togggleItemHandler = e => {
    const value = e.target.value;
    setCheckedItems(prev => {
      if (prev.includes(value)) {
        return [...prev.filter(item => item !== value)];
      } else {
        return [...prev, value];
      }
    });
  };

  return (
    <StyledContainer>
      <StyledHeaderContainer>{header}</StyledHeaderContainer>
      <StyledSearchBoxContainer>
        <StyledInputSearch
          value={keyword}
          onChange={keywordChangeHandler}
          placeholder="검색"
        />
      </StyledSearchBoxContainer>
      <StyledListContainer>
        {items
          .filter(item => labelPicker(item).includes(keyword))
          .map((item, index) => (
            <CheckboxItem
              key={idPicker(item)}
              name={name}
              value={valuePicker(item)}
              isChecked={checkedItems.includes(valuePicker(item))}
              onChange={togggleItemHandler}
              label={labelPicker(item)}
            />
          ))}
      </StyledListContainer>
    </StyledContainer>
  );
};

export default CheckboxList;
