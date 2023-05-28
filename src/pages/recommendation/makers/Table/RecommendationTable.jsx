import {Table} from 'semantic-ui-react';
import styled from 'styled-components';

// import {TableWrapper} from '../../../style/common.style';

import Select from 'react-select';
import {TableWrapper} from 'style/common.style';

import {useEffect, useState} from 'react';
import RecommendationEditModal from '../Modal/RecommendationEditModal';
// import FoodGroupEditModal from '../Modal/FoodGroupEditModal';

const RecommendationTable = ({data, checkboxList, setCheckboxList}) => {
  const [showModal, setShowModal] = useState(false);

  const [clickedData, setClickedData] = useState({});

  //값 확인하기

  //   console.log(data[0].foodType.find(v => v.order === 0).foodTypes);
  //   console.log(data[0].foodType);

  const handleAllCheck = checked => {
    if (!checked) {
      setCheckboxList([]);
    } else {
      setCheckboxList([...data.map(v => v.id)]);
    }
  };

  const handleSingleCheck = (checked, id) => {
    if (!checked) {
      // 체크 되어있을떄 -> 뺴줘야됨
      setCheckboxList(checkboxList.filter(v => v !== id));
    } else {
      // 체크 안되어있을떄
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
              <Table.HeaderCell>고객사</Table.HeaderCell>
              <Table.HeaderCell>
                추천
                <br />
                식품 타입 1
              </Table.HeaderCell>
              <Table.HeaderCell>추천 비중</Table.HeaderCell>
              <Table.HeaderCell>
                추천
                <br />
                식품 타입 2
              </Table.HeaderCell>
              <Table.HeaderCell>추천 비중</Table.HeaderCell>
              <Table.HeaderCell>
                추천
                <br />
                식품 타입 3
              </Table.HeaderCell>
              <Table.HeaderCell>추천 비중</Table.HeaderCell>
              <Table.HeaderCell>
                추천
                <br />
                식품 타입 4
              </Table.HeaderCell>
              <Table.HeaderCell>추천 비중</Table.HeaderCell>
              <Table.HeaderCell>
                추천
                <br />
                식품 타입 5
              </Table.HeaderCell>
              <Table.HeaderCell>추천 비중</Table.HeaderCell>
              <Table.HeaderCell>
                추천
                <br />
                식품 타입 6
              </Table.HeaderCell>
              <Table.HeaderCell>추천 비중</Table.HeaderCell>

              <Table.HeaderCell width={10} textAlign="center">
                상품 그룹 <br />
                확정 추가_월
              </Table.HeaderCell>
              <Table.HeaderCell width={10} textAlign="center">
                상품 그룹 <br />
                확정 추가_화
              </Table.HeaderCell>
              <Table.HeaderCell width={10} textAlign="center">
                상품 그룹 <br />
                확정 추가_수
              </Table.HeaderCell>
              <Table.HeaderCell width={10} textAlign="center">
                상품 그룹 <br />
                확정 추가_목
              </Table.HeaderCell>
              <Table.HeaderCell width={10} textAlign="center">
                상품 그룹 <br />
                확정 추가_금
              </Table.HeaderCell>
              <Table.HeaderCell width={10} textAlign="center">
                상품 그룹 <br />
                확정 추가_토
              </Table.HeaderCell>
              <Table.HeaderCell width={10} textAlign="center">
                상품 그룹 <br />
                확정 추가_일
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Array.isArray(data) &&
              data?.length > 0 &&
              data?.map((row, i) => {
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
                      <FlexBox>{row.groups}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {row.foodType.find(v => v.order === 0)?.foodTypes}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {row.foodType.find(v => v.order === 0)?.importances}
                      </FlexBox>
                    </Table.Cell>

                    <Table.Cell>
                      <FlexBox>
                        {row.foodType.find(v => v.order === 1)?.foodTypes}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {row.foodType.find(v => v.order === 1)?.importances}
                      </FlexBox>
                    </Table.Cell>

                    <Table.Cell>
                      <FlexBox>
                        {row.foodType.find(v => v.order === 2)?.foodTypes}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {row.foodType.find(v => v.order === 2)?.importances}
                      </FlexBox>
                    </Table.Cell>

                    <Table.Cell>
                      <FlexBox>
                        {row.foodType.find(v => v.order === 3)?.foodTypes}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {row.foodType.find(v => v.order === 3)?.importances}
                      </FlexBox>
                    </Table.Cell>

                    <Table.Cell>
                      <FlexBox>
                        {row.foodType.find(v => v.order === 4)?.foodTypes}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {row.foodType.find(v => v.order === 4)?.importances}
                      </FlexBox>
                    </Table.Cell>

                    <Table.Cell>
                      <FlexBox>
                        {row.foodType.find(v => v.order === 5)?.foodTypes}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {row.foodType.find(v => v.order === 5)?.importances}
                      </FlexBox>
                    </Table.Cell>

                    {/* /// */}
                    <Table.Cell>
                      <FlexBox>
                        {
                          row.dailyFoodGroups.find(v => v.days === 0)
                            ?.foodGroups
                        }
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {
                          row.dailyFoodGroups.find(v => v.days === 1)
                            ?.foodGroups
                        }
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {
                          row.dailyFoodGroups.find(v => v.days === 2)
                            ?.foodGroups
                        }
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {
                          row.dailyFoodGroups.find(v => v.days === 3)
                            ?.foodGroups
                        }
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {
                          row.dailyFoodGroups.find(v => v.days === 4)
                            ?.foodGroups
                        }
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {
                          row.dailyFoodGroups.find(v => v.days === 5)
                            ?.foodGroups
                        }
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {
                          row.dailyFoodGroups.find(v => v.days === 6)
                            ?.foodGroups
                        }
                      </FlexBox>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>

        {/* <FoodGroupEditModal
          open={showModal}
          setOpen={setShowModal}
          nowData={clickedData}
          setNowData={setClickedData}
        /> */}

        <RecommendationEditModal
          open={showModal}
          setOpen={setShowModal}
          nowData={clickedData}
          setNowData={setClickedData}
        />
      </TableWrapper>
    </>
  );
};

export default RecommendationTable;

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
