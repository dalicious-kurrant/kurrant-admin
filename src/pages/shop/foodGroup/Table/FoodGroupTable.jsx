import {Table} from 'semantic-ui-react';
import styled from 'styled-components';

// import {TableWrapper} from '../../../style/common.style';

import {TableWrapper} from 'style/common.style';

import {useState} from 'react';
import FoodGroupEditModal from '../Modal/FoodGroupEditModal';
// import FoodGroupEditModal from '../Modal/FoodGroupEditModal';

const FoodGroupTable = ({data, checkboxList, setCheckboxList}) => {
  const [showModal, setShowModal] = useState(false);
  const [clickedData, setClickedData] = useState({});

  const handleAllCheck = checked => {
    if (!checked) {
      setCheckboxList([]);
    } else {
      setCheckboxList([...data.map(v => v.id)]);
    }
  };

  const handleSingleCheck = (checked, id) => {
    if (!checked) {
      setCheckboxList(checkboxList.filter(v => v !== id));
    } else {
      setCheckboxList([...checkboxList, id]);
    }
  };

  return (
    <>
      <TableWrapper>
        {/* 모달 */}

        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">
                <input
                  checked={data?.length === checkboxList?.length ? true : false}
                  // checked={false}
                  type="checkbox"
                  onChange={e => handleAllCheck(e.target.checked)}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>메이커스</Table.HeaderCell>
              <Table.HeaderCell>상품 그룹 ID</Table.HeaderCell>
              <Table.HeaderCell>상품 그룹 이름</Table.HeaderCell>
              <Table.HeaderCell>
                동일 날짜 동시 추천 가능 여부
                <br />
                (숫자가 같은 그룹끼리는 같은 날 추천 가능)
              </Table.HeaderCell>
              <Table.HeaderCell>샐러드</Table.HeaderCell>
              <Table.HeaderCell>정찬도시락</Table.HeaderCell>
              <Table.HeaderCell width={10} textAlign="center">
                프로틴식
              </Table.HeaderCell>
              <Table.HeaderCell>다이어트식</Table.HeaderCell>
              <Table.HeaderCell>산후조리식</Table.HeaderCell>
              <Table.HeaderCell>샌드위치</Table.HeaderCell>
              <Table.HeaderCell>간편식</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data?.length > 0 &&
              data?.map((row) => {
                return (
                  <Table.Row
                    style={{
                      cursor: 'pointer',
                    }}
                    key={row.id}
                    onClick={e => {
                      e.stopPropagation();
                      // setSelectedId(row);
                      setShowModal(true);
                      setClickedData(row);
                      //   showEditOpen(row.id);
                    }}>
                    <Table.Cell
                      textAlign="center"
                      onClick={e => e.stopPropagation()}>
                      <input
                        checked={checkboxList.includes(row.id) ? true : false}
                        type="checkbox"
                        // onClick={e => checked(e, el.foodId)}
                        onChange={e => {
                          handleSingleCheck(e.target.checked, row.id);
                        }}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.makers}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.id}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.name}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.groupNumbers}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.saladPercent}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.dinnerBoxPercent}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      {/* <ContentFlexBox>{row.content}</ContentFlexBox> */}
                      <FlexBox>
                        <Content>{row.proteinPercent}</Content>
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.dietPercent}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.postpartumPercent}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.singleBowlPercent}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.conveniencePercent}</FlexBox>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>

        <FoodGroupEditModal
          open={showModal}
          setOpen={setShowModal}
          nowData={clickedData}
          setNowData={setClickedData}
        />
      </TableWrapper>
    </>
  );
};

export default FoodGroupTable;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;


const Content = styled.div`
  max-width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;



