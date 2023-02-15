import {useEffect} from 'react';
import {useState} from 'react';
import styled from 'styled-components';

import {handleFalsyValue} from 'utils/valueHandlingLogics';
import theme from '../../theme/theme';
import Checkbox from '../Checkbox';

// 이 Table 컴포넌트는 다르다???

// - 데이터 안에 정해진 필드가 아닌 필드가 들어있으면 자동으로 걸러준다
// - 데이터 값이 number나 string이 아닌 경우는 '-'로 표기한다

const Table = ({tableFieldsInput, tableDataInput}) => {
  const useTheme = theme;

  const [keyOfTableFieldsInput, setKeyOfTableFieldsInput] = useState([]);

  useEffect(() => {
    setKeyOfTableFieldsInput(Object.keys(tableFieldsInput));
  }, [tableFieldsInput]);

  useEffect(() => {
    // 배열 아닐경우 아웃!
    if (!Array.isArray(keyOfTableFieldsInput)) return;
    // 배열이 비여있을 경우 아웃
    if (keyOfTableFieldsInput.length === 0) return;
    // 걸러내기
  }, [tableDataInput, keyOfTableFieldsInput]);

  return (
    <Container>
      <table border={1} bgcolor={useTheme.colors.white}>
        {/* <table bgcolor={useTheme.colors.white}> */}
        <thead>
          <tr>
            {/* <td>체크박스</td> */}
            {/* <td></td> */}
            <CheckBoxTh />
            {keyOfTableFieldsInput &&
              keyOfTableFieldsInput.map((val, index) => (
                <th align="left" key={index}>
                  {tableFieldsInput[val]}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {tableDataInput &&
            tableDataInput.map((value1, index1) => {
              // 필드에 없는 값들은 걸러내기
              let yo = [];
              keyOfTableFieldsInput.forEach((value2, index2) => {
                if (Object.keys(value1).includes(value2)) {
                  yo.push(value1[value2]);
                }
              });
              return (
                <tr key={index1}>
                  <CheckBoxTd align="center">
                    <Checkbox width="2rem" height="2rem" css="margin:auto;" />
                  </CheckBoxTd>

                  {yo.map((value3, index3) => (
                    <td align="left" key={index3}>
                      {handleFalsyValue(value3)}
                    </td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </table>
    </Container>
  );
};

export default Table;

const Container = styled.div`
  border-collapse: collapse;

  width: 100%;

  > table {
    width: 100%;

    overflow: auto;
    white-space: nowrap;
  }

  thead {
    background-color: ${props => props.theme.colors.Grey02};
    tr {
      border: 1px solid ${props => props.theme.colors.Grey05};
      height: 5rem;
    }
    th {
      border: 1px solid ${props => props.theme.colors.Grey05};
      vertical-align: middle;
      padding: 0.8rem;
      font-size: 1.1rem;

      min-width: 5rem;
      ${props => props.theme.colors.Black02}
      ${props => props.theme.fonts.H10}
    }
  }

  tbody {
    tr {
      border: 1px solid ${props => props.theme.colors.Grey05};
    }
    td {
      border: 1px solid ${props => props.theme.colors.Grey05};
      vertical-align: middle;
      padding: 0.8rem;
      height: 6.4rem;
      font-size: 1rem;
      /* ${props => props.theme.fonts.Body07} */
    }
  }
`;

const CheckBoxTh = styled.th`
  width: 4rem;
`;
const CheckBoxTd = styled.td`
  width: 4rem;
`;
