import TableCheckbox from 'common/TableCheckbox';

import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {useState} from 'react';
import Theme from 'style/Theme';
import styled from 'styled-components';

import {
  handleFalsyValueToHyphen,
  handleFalsyValueToString,
} from 'utils/valueHandlingLogics';
import MemoInput from './MemoInput/MemoInput';
import {TableCheckboxStatusAtom} from './store';

// 이 Table 컴포넌트는 다르다???

// - 데이터 안에 정해진 필드가 아닌 필드가 들어있으면 자동으로 걸러준다
// - 데이터 값이 number나 string이 아닌 경우는 '-'로 표기한다

const HTMLTable = ({fieldsInput, dataInput, isMemo = false, handleChange}) => {
  const useTheme = Theme;

  const [keyOfTableFieldsInput, setKeyOfTableFieldsInput] = useState([]);

  const [checkboxStatus, setCheckboxStatus] = useAtom(TableCheckboxStatusAtom);

  useEffect(() => {
    setKeyOfTableFieldsInput(Object.keys(fieldsInput));
  }, [fieldsInput]);

  useEffect(() => {
    const object1 = {parent: false};
    const yo1 = [...dataInput].map(value => {
      return value.id;
    });

    yo1.forEach(value => {
      object1[value] = false;
    });

    setCheckboxStatus({
      ...object1,
    });
  }, [dataInput]);

  const onCheckCheckbox = value => {
    if (value === 'parent') {
      const yoyo = {};
      Object.keys(checkboxStatus).forEach(value => {
        if (checkboxStatus.parent === false) {
          yoyo[value] = true;
        } else {
          yoyo[value] = false;
        }
      });

      setCheckboxStatus({...yoyo});
    } else {
      setCheckboxStatus({
        ...checkboxStatus,
        [value]: !checkboxStatus[value],
      });
    }
  };

  // 추가 메모 기능

  return (
    <Container>
      <table bgcolor={useTheme.colors.white}>
        <thead>
          <tr>
            <CheckBoxTh>
              <TableCheckbox
                width="2rem"
                height="2rem"
                css="margin:auto;"
                value={'parent'}
                checkboxStatus={checkboxStatus}
                onChecked={onCheckCheckbox}
              />
            </CheckBoxTh>

            {keyOfTableFieldsInput &&
              keyOfTableFieldsInput.map((val, index) => (
                <th align="left" key={index}>
                  {fieldsInput[val]}
                </th>
              ))}

            {!!isMemo && <th className="memo">Memo</th>}
          </tr>
        </thead>
        <tbody>
          {dataInput &&
            dataInput.map((value1, index1) => {
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
                    <TableCheckbox
                      width="2rem"
                      height="2rem"
                      css="margin:auto;"
                      checkboxStatus={checkboxStatus}
                      value={value1.id}
                      onChecked={onCheckCheckbox}
                    />
                  </CheckBoxTd>

                  {yo.map((value3, index3) => {
                    return (
                      <td align="left" key={index3}>
                        {handleFalsyValueToHyphen(value3)}
                      </td>
                    );
                  })}

                  {!!isMemo && (
                    <td className="memo">
                      <MemoInput input={value1} handleChange={handleChange} />
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </Container>
  );
};

export default HTMLTable;

const Container = styled.div`
  border-collapse: collapse;
  width: 100%;

  form {
  }

  table {
    width: 100%;
    overflow: auto;
    white-space: nowrap;
  }

  thead {
    /* border-bottom: 2px solid ${props => props.theme.colors.Grey03}; */

    tr {
      height: 5rem;
    }
    th {
      border: 1px solid ${props => props.theme.colors.grey[6]};
      vertical-align: middle;
      padding: 0.6rem;
      font-size: 1.3rem;

      :last-child {
      }
    }
    .memo {
      padding: 0;
      width: 30rem;
    }
  }

  tbody {
    tr {
    }
    td {
      border: 1px solid ${props => props.theme.colors.grey[6]};
      vertical-align: middle;
      padding: 0.6rem;
      height: 6.4rem;
    }

    .memo {
      padding: 0;
    }
  }
`;

const CheckBoxTh = styled.th`
  width: 4rem;
`;
const CheckBoxTd = styled.td`
  width: 4rem;
`;
