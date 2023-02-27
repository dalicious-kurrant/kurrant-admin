import {Dropdown, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {TableWrapper} from '../../../style/common.style';
import {foodStatusData} from '../../../utils/statusFormatter';

const CustomPlanTable = ({count, testData, setTestData}) => {
  const changeStatus = (d, b) => {
    setTestData(
      testData.map(makers => {
        return {
          ...makers,
          clientSchedule: makers.clientSchedule.map(client => {
            return {
              ...client,
              foodSchedule: client.foodSchedule.map(food => {
                if (food.presetFoodId === d.presetFoodId) {
                  return {
                    ...food,
                    foodStatus: b,
                  };
                }
                return food;
              }),
            };
          }),
        };
      }),
    );
  };
  return (
    <TableWrapper>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            {/* <Table.HeaderCell>다이닝 타입 별 승인 상태</Table.HeaderCell> */}
            <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">다이닝타입</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">고객사</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">고객사 식수</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">배송시간</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">메이커스</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              메이커스 케파
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              주문가능{'\n'}수량
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              메이커스{'\n'}픽업시간
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">상품</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">음식 승인</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Food 케파</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              주문가능{'\n'}수량
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {testData.length > 0 &&
            testData?.map((v, i) => {
              return v.clientSchedule.map((s, si) => {
                return s.foodSchedule.map((d, di) => {
                  return (
                    <Table.Row key={`${d.foodName + di}`}>
                      <Table.Cell padding="0px" textAlign="center"></Table.Cell>
                      {di === 0 && si === 0 && (
                        <Table.Cell rowSpan={count[i]}>
                          <FlexBox>{v.serviceDate}</FlexBox>
                        </Table.Cell>
                      )}

                      {di === 0 && si === 0 && (
                        <Table.Cell rowSpan={count[i]}>
                          <FlexBox>{v.diningType}</FlexBox>
                        </Table.Cell>
                      )}
                      {di === 0 && si === 0 && (
                        <Table.Cell rowSpan={count[i]}>
                          <FlexBox>{s.clientName}</FlexBox>
                        </Table.Cell>
                      )}
                      {di === 0 && si === 0 && (
                        <Table.Cell rowSpan={count[i]}>
                          <FlexBox>{s.clientCapacity}</FlexBox>
                        </Table.Cell>
                      )}
                      {di === 0 && si === 0 && (
                        <Table.Cell rowSpan={count[i]}>
                          <FlexBox>{s.pickupTime}</FlexBox>
                        </Table.Cell>
                      )}
                      {di === 0 && (
                        <Table.Cell rowSpan={s.foodSchedule.length}>
                          <FlexBox>{v.makersName}</FlexBox>
                        </Table.Cell>
                      )}
                      {di === 0 && (
                        <Table.Cell rowSpan={s.foodSchedule.length}>
                          <FlexBox>{v.makersCapacity}</FlexBox>
                        </Table.Cell>
                      )}
                      {di === 0 && (
                        <Table.Cell rowSpan={s.foodSchedule.length}>
                          <FlexBox>{v.makersCapacity}</FlexBox>
                        </Table.Cell>
                      )}
                      {di === 0 && (
                        <Table.Cell rowSpan={s.foodSchedule.length}>
                          <FlexBox>{s.pickupTime}</FlexBox>
                        </Table.Cell>
                      )}

                      <Table.Cell>
                        <FlexBox>{d.foodName} </FlexBox>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <FlexBox>
                          <DropdownBox>
                            {/* <Dropdown
                          item
                          text={
                            foodStatusData.filter(
                              v => v.text === d.foodStatus,
                            )[0].value
                          }>
                          <Dropdown.Menu>
                            {foodStatusData?.map(b => (
                              <Dropdown.Item
                                key={`${b.key}`}
                                onClick={() => changeStatus(d, b)}>
                                {b.text}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown> */}
                            <Dropdown
                              placeholder="판매상태"
                              fluid
                              selection
                              defaultValue={
                                foodStatusData.filter(
                                  v => v.text === d.foodStatus,
                                )[0].value
                              }
                              options={foodStatusData}
                              onChange={(e, data) => {
                                changeStatus(d, data.value);
                              }}
                            />
                          </DropdownBox>
                        </FlexBox>
                      </Table.Cell>

                      <Table.Cell>
                        <FlexBox>{d.foodCapacity}</FlexBox>
                      </Table.Cell>
                      <Table.Cell>
                        <FlexBox>{v.makersCapacity}</FlexBox>
                      </Table.Cell>
                    </Table.Row>
                  );
                });
              });
            })}
        </Table.Body>
      </Table>
    </TableWrapper>
  );
};

export default CustomPlanTable;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;
const DropdownBox = styled.div`
  width: 150px;
`;