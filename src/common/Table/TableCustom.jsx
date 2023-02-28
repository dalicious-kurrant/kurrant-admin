import React from 'react';
import TableCheckbox from 'common/TableCheckbox';

import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {useState} from 'react';
import Theme from 'style/Theme';
import styled from 'styled-components';

import MemoInput from './MemoInput/MemoInput';
import {TableCheckboxStatusAtom, TableDeleteListAtom} from './store';

import {Button, Label, Table, Dropdown, DropBox} from 'semantic-ui-react';
import {handleFalsyValueToHyphen} from 'utils/valueHandlingLogics';

// import putId from './'

const options = [
  {key: '달리셔스', text: '달리셔스', value: '달리셔스'},
  {key: '커런트', text: '커런트', value: '커런트'},
];

const TableCustom = ({
  fieldsInput,
  dataInput,
  useFilterList,
  isMemo = false,
  handleChange,
  ellipsisList,
}) => {
  // 데이터에 'id'필드가 없을시 생성해 줌

  const [keyOfTableFieldsInput, setKeyOfTableFieldsInput] = useState([]);

  const [checkboxStatus, setCheckboxStatus] = useAtom(TableCheckboxStatusAtom);

  const [tableDeleteList, setTableDeleteList] = useAtom(TableDeleteListAtom);

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

  const onDeleteCancelClick = e => {
    // const deleteTargetId = e.target.id.toString();
    // const yes = [...tableDeleteList];
    // let array1 = [];
    // yes.forEach(v => {
    //   if (v.toString() == deleteTargetId) {
    //   } else {
    //     array1.push(v);
    //   }
    // });
    // array1
  };

  // useEffect(() => {
  //   console.log(dataInput);
  // }, [dataInput]);

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
              keyOfTableFieldsInput?.map((val, index) => {
                return (
                  <Table.HeaderCell align="left" key={index}>
                    {fieldsInput[val]}
                  </Table.HeaderCell>
                );
              })}

            {!!isMemo && (
              <Table.HeaderCell className="memo">Memo</Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {dataInput &&
            dataInput.map((value1, index1) => {
              // 필드에 없는 값들은 걸러내기

              let yo = [];

              keyOfTableFieldsInput?.forEach((value2, index2) => {
                if (Object.keys(value1).includes(value2)) {
                  yo.push({[value2]: value1[value2]});
                }
              });

              // 삭제 리스트 따로 처리하기

              if (value1.isOnDeleteList) {
                return (
                  <DeleteListTableRow key={index1}>
                    <CheckBoxTd align="center">
                      <TableCheckbox
                        width="2rem"
                        height="2rem"
                        css="margin:auto;"
                        checkboxStatus={checkboxStatus}
                        value={value1.id}
                        onChecked={onCheckCheckbox}
                        disabled={true}
                      />
                    </CheckBoxTd>

                    {yo?.map((value3, index3) => {
                      let ellipsisOn = undefined;

                      ellipsisList &&
                        ellipsisList.forEach(val => {
                          if (val.key === Object.keys(value3)[0]) {
                            ellipsisOn = val;
                          }
                        });

                      if (ellipsisOn) {
                        return (
                          <Table.Cell key={index3}>
                            <EllipsisCell
                              length={ellipsisOn.length}
                              align="left">
                              {handleFalsyValueToHyphen(
                                Object.values(value3)[0],
                              )}
                            </EllipsisCell>
                          </Table.Cell>
                        );
                      } else {
                        return (
                          <MyCell align="left" key={index3}>
                            {handleFalsyValueToHyphen(Object.values(value3)[0])}
                          </MyCell>
                        );
                      }
                    })}

                    {!!isMemo && (
                      <Table.Cell className="memo">
                        <MemoInput input={value1} handleChange={handleChange} />
                      </Table.Cell>
                    )}
                  </DeleteListTableRow>
                );
              } else {
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

                    {yo?.map((value3, index3) => {
                      let ellipsisOn = undefined;

                      ellipsisList &&
                        ellipsisList.forEach(val => {
                          if (val.key === Object.keys(value3)[0]) {
                            ellipsisOn = val;
                          }
                        });

                      if (ellipsisOn) {
                        return (
                          <Table.Cell key={index3}>
                            <EllipsisCell
                              length={ellipsisOn.length}
                              align="left">
                              {handleFalsyValueToHyphen(
                                Object.values(value3)[0],
                              )}
                            </EllipsisCell>
                          </Table.Cell>
                        );
                      } else {
                        return (
                          <MyCell align="left" key={index3}>
                            {handleFalsyValueToHyphen(Object.values(value3)[0])}
                          </MyCell>
                        );
                      }
                    })}

                    {!!isMemo && (
                      <Table.Cell className="memo">
                        <MemoInput input={value1} handleChange={handleChange} />
                      </Table.Cell>
                    )}
                  </Table.Row>
                );
              }
            })}
        </Table.Body>
      </Table>
    </>
  );
};
export default TableCustom;

const CheckBoxTh = styled.th`
  width: 4rem;
`;
const CheckBoxTd = styled.td`
  width: 4rem;
`;

const MyCell = styled(Table.Cell)`
  text-overflow: ellipsis;
  overflow: hidden;
  width: 1rem;
  white-space: nowrap;
`;

const DeleteListTableRow = styled(Table.Row)`
  color: red;
  text-decoration: line-through;
`;

const EllipsisCell = styled.div`
  width: ${({length}) => length};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
