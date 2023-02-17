import {useRef} from 'react';
import styled from 'styled-components';
import useSelect from '../../hooks/useSelect';

const SelectBox = ({
  options,
  selectedOption,
  setSelectedOption,
  width,
  maxHeight,
  name,
  labelName,
  defualtValue,
  handleSelectOptionClick,
  ...props
}) => {
  const labelRef = useRef(null);
  const [clickSelectedBox, setClickSelectedBox] = useSelect(labelRef);

  const handleOpenSelectBox = e => {
    e.preventDefault();
    setClickSelectedBox(prev => !prev);
  };

  const handleSelectBox = (e, option) => {
    const optionValue = option ? option : e.target.value;

    setSelectedOption(optionValue);
    setClickSelectedBox(false);
  };

  const stopEvent = e => {
    e.stopPropagation();
  };

  return (
    <>
      <Label
        {...props}
        tabIndex={0}
        role="group"
        aria-label={name}
        width={width}
        ref={labelRef}
        onMouseDown={handleOpenSelectBox}>
        {labelName}
        <Select
          value={selectedOption}
          onChange={handleSelectBox}
          open={clickSelectedBox}>
          <option>{defualtValue}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option.text}
            </option>
          ))}
        </Select>
      </Label>
      {clickSelectedBox && (
        <Wrap width={width}>
          <SearchInput type="text" onClick={stopEvent} width={width} />
          <SelectItemWrapper maxHeight={maxHeight} width={width}>
            {options.map((option, index) => (
              <SelectItem
                key={index}
                onClick={e => handleSelectBox(e, option)}
                isSelected={option === selectedOption}>
                {option.text}
              </SelectItem>
            ))}
          </SelectItemWrapper>
        </Wrap>
      )}
    </>
  );
};
export default SelectBox;

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: ${({width}) => (typeof width === 'string' ? width : `${width}px`)};
  cursor: pointer;
  position: relative;
`;

const Select = styled.select`
  position: relative;
  padding: 4px 16px 4px 4px;
  width: 100%;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
  border-bottom-left-radius: ${({open}) => (open ? '0px' : '4px')};
  border-bottom-right-radius: ${({open}) => (open ? '0px' : '4px')};
  /* appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none; */
`;

const SelectItemWrapper = styled.ul`
  width: ${({width}) => (typeof width === 'string' ? width : `${width}px`)};
  min-height: 200px;
  overflow-y: auto;
`;

const SelectItem = styled.li`
  cursor: pointer;
  padding: 6px;
  :hover {
    background-color: ${({theme}) => theme.colors.grey[8]};
  }
`;

const SearchInput = styled.input`
  outline: none;
  //width: ${({width}) => (typeof width === 'string' ? width : `${width}px`)};
  margin: 2px;
  border: 1px solid black;
`;

const Wrap = styled.div`
  width: ${({width}) => (typeof width === 'string' ? width : `${width}px`)};
  border: 1px solid black;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-sizing: border-box;
`;
