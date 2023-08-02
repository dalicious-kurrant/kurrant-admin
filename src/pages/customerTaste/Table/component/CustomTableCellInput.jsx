import {Table} from 'semantic-ui-react';

import styled from 'styled-components';

const CustomInputTableCell = ({i, idNum, inputValues, setInputValues}) => {
  const thisInputValue =
    i === 0
      ? inputValues[0]
      : i === 1
      ? inputValues[1]
      : i === 2
      ? inputValues[2]
      : i === 3 && inputValues[3];

  const thisSetInputValue =
    i === 0
      ? setInputValues[0]
      : i === 1
      ? setInputValues[1]
      : i === 2
      ? setInputValues[2]
      : i === 3 && setInputValues[3];

  return (
    <Table.Cell>
      <FlexBox>
        <CellInput
          value={thisInputValue[idNum] ? thisInputValue[idNum] : ''}
          onChange={e => {
            const arr = [...thisInputValue];
            arr.splice(idNum, 1, e.target.value);

            thisSetInputValue([...arr]);
          }}
        />
      </FlexBox>
    </Table.Cell>
  );
};
export default CustomInputTableCell;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

const CellInput = styled.input`
  /* outline: none; */
  border: none;

  width: 30px;
  font-weight: 500;
  text-align: center;
  font-size: 16px;
  padding-top: 3px;
  /* vertical-align: middle; */
  /* line-height: 2px; */
`;
