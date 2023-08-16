import {Table} from 'semantic-ui-react';
import styled from 'styled-components';

// import {TableWrapper} from '../../../style/common.style';

import Select from 'react-select';
import {TableWrapper} from 'style/common.style';

import {useEffect, useState} from 'react';
import reportWebVitals from 'reportWebVitals';
import CustomInputTableCell from './component/CustomTableCellInput';
// import RecommendationEditModal from '../Modal/RecommendationEditModal';
// import FoodGroupEditModal from '../Modal/FoodGroupEditModal';

import {Button} from 'semantic-ui-react';
import useCustomerTasteMutation from '../useCustomerTasteMutation';

const CustomerTasteTable = ({
  data,
  checkboxList,
  setCheckboxList,
  inputValue1,
  setInputValue1,
  inputValue2,
  setInputValue2,
  inputValue3,
  setInputValue3,
  inputValue4,
  setInputValue4,
}) => {
  // const [showModal, setShowModal] = useState(false);

  // const [clickedData, setClickedData] = useState({});

  const {editCustomerTasteData} = useCustomerTasteMutation();

  //값 확인하기

  // const handleAllCheck = checked => {
  //   if (!checked) {
  //     setCheckboxList([]);
  //   } else {
  //     setCheckboxList([...data.map((v, i) => i)]);
  //   }
  // };

  // const handleSingleCheck = (checked, id) => {
  //   if (!checked) {
  //     // 체크 되어있을떄 -> 뺴줘야됨
  //     setCheckboxList(checkboxList.filter(v => v !== id));
  //   } else {
  //     // 체크 안되어있을떄
  //     setCheckboxList([...checkboxList, id]);
  //   }
  // };

  // let arrayWithEmptyString = [];

  // for (let i = 0; i < 21; i++) {
  //   arrayWithEmptyString.push('');
  // }

  useEffect(() => {
    if (!data) return;

    data.forEach((v, i) => {
      switch (i) {
        case 0:
          setInputValue1(v.foodIds.split(', '));
          break;
        case 1:
          setInputValue2(v.foodIds.split(', '));
          break;
        case 2:
          setInputValue3(v.foodIds.split(', '));
          break;
        case 3:
          setInputValue4(v.foodIds.split(', '));
          break;
      }
    });
  }, [data]);

  // useEffect(() => {
  //   console.log('inputValue 1 ');
  //   console.log(inputValue1);
  // }, [inputValue1]);
  // useEffect(() => {
  //   console.log('inputValue 2 ');
  //   console.log(inputValue2);
  // }, [inputValue2]);
  // useEffect(() => {
  //   console.log('inputValue 3 ');
  //   console.log(inputValue3);
  // }, [inputValue3]);
  // useEffect(() => {
  //   console.log('inputValue 4 ');
  //   console.log(inputValue4);
  // }, [inputValue4]);

  const handleEditClick = () => {
    // 등록 데이터 입력하기

    const sendData = {
      testData: [
        {foodIds: [...inputValue1].filter(v => !!v), pageNum: 1},
        {foodIds: [...inputValue2].filter(v => !!v), pageNum: 2},
        {foodIds: [...inputValue3].filter(v => !!v), pageNum: 3},
        {foodIds: [...inputValue4].filter(v => !!v), pageNum: 4},
      ],
    };

    if (window.confirm('이대로 등록하시겠습니까?')) {
      editCustomerTasteData(sendData);
    } else {
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <TableWrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
              {/* <Table.HeaderCell textAlign="center">
                <input
                  checked={data?.length === checkboxList?.length ? true : false}
                  // checked={false}
                  type="checkbox"
                  onChange={e => handleAllCheck(e.target.checked)}
                />
              </Table.HeaderCell> */}
              <Table.HeaderCell width={10}>페이지 No</Table.HeaderCell>

              <Table.HeaderCell width={10}>foodId1</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId2</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId3</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId4</Table.HeaderCell>

              <Table.HeaderCell width={10}>foodId5</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId6</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId7</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId8</Table.HeaderCell>

              <Table.HeaderCell width={10}>foodId9</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId10</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId11</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId12</Table.HeaderCell>

              <Table.HeaderCell width={10}>foodId13</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId14</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId15</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId16</Table.HeaderCell>

              <Table.HeaderCell width={10}>foodId17</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId18</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId19</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId20</Table.HeaderCell>
              <Table.HeaderCell width={10}>foodId21</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {[...new Array(4)].map((row, i) => (
              <Table.Row
                // style={{
                //   cursor: 'pointer',
                // }}
                key={i}
                onClick={e => {
                  e.stopPropagation();
                  // setSelectedId(row);
                  // setShowModal(true);
                  // setClickedData(row);
                  //   showEditOpen(row.id);
                  // console.log(i);₩₩....
                }}
                active={false}>
                {/* <Table.Cell
  textAlign="center"
  onClick={e => e.stopPropagation()}>
  <input
    checked={checkboxList.includes(i) ? true : false}
    type="checkbox"
    // onClick={e => checked(e, el.foodId)}
    onChange={e => {
      handleSingleCheck(e.target.checked, i);
    }}
  />
</Table.Cell> */}
                <Table.Cell>
                  <FlexBox>{i + 1}</FlexBox>
                </Table.Cell>

                {[...new Array(21)].map((v1, i1) => (
                  <CustomInputTableCell
                    i={i}
                    key={`${i}_${i1}`}
                    idNum={i1}
                    inputValues={[
                      inputValue1,
                      inputValue2,
                      inputValue3,
                      inputValue4,
                    ]}
                    setInputValues={[
                      setInputValue1,
                      setInputValue2,
                      setInputValue3,
                      setInputValue4,
                    ]}
                  />
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Button id="edit" color="green" inverted onClick={handleEditClick}>
          등록하기
        </Button>
      </TableWrapper>
    </>
  );
};

export default CustomerTasteTable;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

const IsDeleteFlexBox = styled(FlexBox)`
  color: red;
`;

const Content = styled.div`
  max-width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const FlexPwdBox = styled.div`
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const DropdownBox = styled.div`
  width: 150px;
`;

const SelectWrap = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const SelectBox = styled(Select)`
  width: 250px;
  margin-right: 50px;
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

// {Array.isArray(data) &&
//   data?.length > 0 &&
//   data?.map((row, i) => {
//     return (
//       <Table.Row
//         key={row.pageNum}
//         onClick={e => {
//           e.stopPropagation();
//         }}
//         active={false}>
//         {/* <Table.Cell
//           textAlign="center"
//           onClick={e => e.stopPropagation()}>
//           <input
//             checked={checkboxList.includes(i) ? true : false}
//             type="checkbox"
//             // onClick={e => checked(e, el.foodId)}
//             onChange={e => {
//               handleSingleCheck(e.target.checked, i);
//             }}
//           />
//         </Table.Cell> */}
//         <Table.Cell>
//           <FlexBox>{i + 1}</FlexBox>
//         </Table.Cell>

//         {[...new Array(21)].map((v1, i1) => (
//           <CustomInputTableCell
//             i={i}
//             key={`${i}_${i1}`}
//             idNum={i1}
//             inputValues={[
//               inputValue1,
//               inputValue2,
//               inputValue3,
//               inputValue4,
//             ]}
//             setInputValues={[
//               setInputValue1,
//               setInputValue2,
//               setInputValue3,
//               setInputValue4,
//             ]}
//           />
//         ))}
//       </Table.Row>
//     );
//   })}
