import React from 'react';
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

import {Button, Table} from 'semantic-ui-react';

const TableYo = ({fieldsInput, dataInput, isMemo = false, handleChange}) => {
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

  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
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
                <Table.HeaderCell align="left" key={index}>
                  {fieldsInput[val]}
                </Table.HeaderCell>
              ))}

            {!!isMemo && (
              <Table.HeaderCell className="memo">Memo</Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>

        {/* <TableRow
 <Table.Cell */}
        {/* <Table.Body></Table.Body> */}

        <Table.Body>
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
                <Table.Row key={index1}>
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
                      <Table.Cell align="left" key={index3}>
                        {handleFalsyValueToHyphen(value3)}
                      </Table.Cell>
                    );
                  })}

                  {!!isMemo && (
                    <Table.Cell className="memo">
                      <MemoInput input={value1} handleChange={handleChange} />
                    </Table.Cell>
                  )}
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
};
export default TableYo;

const CheckBoxTh = styled.th`
  width: 4rem;
`;
const CheckBoxTd = styled.td`
  width: 4rem;
`;
