import {Button, Dropdown, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {TableWrapper} from '../../../style/common.style';
import {foodStatusData} from '../../../utils/statusFormatter';

const PlanTable = ({count, testData, setTestData}) => {
  return (
    <TableWrapper>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>메이커스</Table.HeaderCell>
            <Table.HeaderCell>상태</Table.HeaderCell>
            <Table.HeaderCell>날짜</Table.HeaderCell>
            <Table.HeaderCell>다이닝타입</Table.HeaderCell>
            <Table.HeaderCell>메이커스 케파</Table.HeaderCell>
            <Table.HeaderCell>픽업시간</Table.HeaderCell>
            <Table.HeaderCell>고객사</Table.HeaderCell>
            <Table.HeaderCell>고객사 케파</Table.HeaderCell>
            <Table.HeaderCell>주문가능수량</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">음식 승인</Table.HeaderCell>
            <Table.HeaderCell>상품</Table.HeaderCell>
            <Table.HeaderCell>음식 상태</Table.HeaderCell>
            <Table.HeaderCell>Food 케파</Table.HeaderCell>
            <Table.HeaderCell>주문가능수량</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {testData.map((v, i) => {
            return v.clientSchedule.map((s, si) => {
              return s.foodSchedule.map((d, di) => {
                return (
                  <Table.Row key={`${d.foodName + di}`}>
                    <Table.Cell padding="0px" textAlign="center"></Table.Cell>
                    {di === 0 && si === 0 && (
                      <Table.Cell padding="0px" rowSpan={count[i]}>
                        {v.makersCapacity}
                      </Table.Cell>
                    )}
                    {di === 0 && si === 0 && (
                      <Table.Cell padding="0px" rowSpan={count[i]}>
                        <FlexBox>
                          <Button
                            toggle
                            color={
                              v.scheduleStatus === 0
                                ? 'grey'
                                : v.scheduleStatus === 1
                                ? 'green'
                                : 'red'
                            }
                            //   onClick={()=>{setTestData(testData.map((makers)=>{
                            //     return {...makers ,clientSchedule:makers.clientSchedule.map((client)=>{
                            //       return {...client,foodSchedule:client.foodSchedule.map((food)=>{
                            //         if(food.presetFoodId === d.presetFoodId){
                            //             return {...food,scheduleStatus:d.scheduleStatus === 0? 1:d.scheduleStatus===1 ? 2:0}
                            //         }
                            //         return food;
                            //       })}
                            //     })}
                            // }))}}
                          >
                            {v.scheduleStatus === 0
                              ? '대기'
                              : v.scheduleStatus === 1
                              ? '승인'
                              : '거절'}
                          </Button>
                        </FlexBox>
                      </Table.Cell>
                    )}
                    {di === 0 && si === 0 && (
                      <Table.Cell rowSpan={count[i]}>
                        {v.serviceDate}
                      </Table.Cell>
                    )}
                    {di === 0 && si === 0 && (
                      <Table.Cell rowSpan={count[i]}>{v.diningType}</Table.Cell>
                    )}
                    {di === 0 && si === 0 && (
                      <Table.Cell rowSpan={count[i]}>
                        {v.makersCapacity}
                      </Table.Cell>
                    )}
                    {di === 0 && (
                      <Table.Cell rowSpan={s.foodSchedule.length}>
                        {s.pickupTime}
                      </Table.Cell>
                    )}
                    {di === 0 && (
                      <Table.Cell rowSpan={s.foodSchedule.length}>
                        {s.clientName}
                      </Table.Cell>
                    )}
                    {di === 0 && (
                      <Table.Cell rowSpan={s.foodSchedule.length}>
                        {s.clientCapacity}
                      </Table.Cell>
                    )}
                    {di === 0 && (
                      <Table.Cell rowSpan={s.foodSchedule.length}>
                        {s.clientCapacity}
                      </Table.Cell>
                    )}
                    <Table.Cell textAlign="center">
                      <Button
                        toggle
                        color={
                          d.scheduleStatus === 0
                            ? 'grey'
                            : d.scheduleStatus === 1
                            ? 'green'
                            : 'red'
                        }
                        //   onClick={()=>{setTestData(testData.map((makers)=>{
                        //     return {...makers ,clientSchedule:makers.clientSchedule.map((client)=>{
                        //       return {...client,foodSchedule:client.foodSchedule.map((food)=>{
                        //         if(food.presetFoodId === d.presetFoodId){
                        //             return {...food,scheduleStatus:d.scheduleStatus === 0? 1:d.scheduleStatus===1 ? 2:0}
                        //         }
                        //         return food;
                        //       })}
                        //     })}
                        // }))}}
                      >
                        {d.scheduleStatus === 0
                          ? '대기'
                          : d.scheduleStatus === 1
                          ? '승인'
                          : '거절'}
                      </Button>
                    </Table.Cell>
                    <Table.Cell>{d.foodName}</Table.Cell>
                    <Table.Cell>
                      <DropdownBox>
                        <Dropdown
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
                                onClick={() => {
                                  console.log(testData);
                                  setTestData(
                                    testData.map(makers => {
                                      return {
                                        ...makers,
                                        clientSchedule:
                                          makers.clientSchedule.map(client => {
                                            return {
                                              ...client,
                                              foodSchedule:
                                                client.foodSchedule.map(
                                                  food => {
                                                    if (
                                                      food.presetFoodId ===
                                                      d.presetFoodId
                                                    ) {
                                                      return {
                                                        ...food,
                                                        foodStatus: b.value,
                                                      };
                                                    }
                                                    return food;
                                                  },
                                                ),
                                            };
                                          }),
                                      };
                                    }),
                                  );
                                }}>
                                {b.text}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </DropdownBox>
                    </Table.Cell>

                    <Table.Cell>{d.foodCapacity}</Table.Cell>
                    <Table.Cell>{d.foodCapacity}</Table.Cell>
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

export default PlanTable;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DropdownBox = styled.div`
  width: 150px;
`;
