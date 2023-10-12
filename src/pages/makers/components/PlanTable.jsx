import {Button,  Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {TableWrapper} from '../../../style/common.style';

const PlanTable = ({count, testData, setTestData}) => {

  return (
    <TableWrapper>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>다이닝 타입 별 승인 상태</Table.HeaderCell>
            <Table.HeaderCell>메이커스</Table.HeaderCell>
            <Table.HeaderCell>날짜</Table.HeaderCell>
            <Table.HeaderCell>다이닝타입</Table.HeaderCell>
            <Table.HeaderCell>메이커스 케파</Table.HeaderCell>
            <Table.HeaderCell>픽업시간</Table.HeaderCell>
            <Table.HeaderCell>고객사</Table.HeaderCell>
            <Table.HeaderCell>고객사 케파</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">음식 승인</Table.HeaderCell>
            <Table.HeaderCell>상품</Table.HeaderCell>
            {/* <Table.HeaderCell>음식 상태</Table.HeaderCell> */}
            <Table.HeaderCell>Food 케파</Table.HeaderCell>
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
                              }>
                              <FlexBox>
                                {v.scheduleStatus === 0
                                  ? '요청'
                                  : v.scheduleStatus === 1
                                  ? '승인'
                                  : '거절'}
                              </FlexBox>
                            </Button>
                          </FlexBox>
                        </Table.Cell>
                      )}
                      {di === 0 && si === 0 && (
                        <Table.Cell padding="0px" rowSpan={count[i]}>
                          <FlexBox>{v.makersName}</FlexBox>
                        </Table.Cell>
                      )}
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
                          <FlexBox>{v.makersCapacity}</FlexBox>
                        </Table.Cell>
                      )}
                      {di === 0 && (
                        <Table.Cell rowSpan={s.foodSchedule.length}>
                          <FlexBox>{s.pickupTime}</FlexBox>
                        </Table.Cell>
                      )}
                      {di === 0 && (
                        <Table.Cell rowSpan={s.foodSchedule.length}>
                          <FlexBox>{s.clientName}</FlexBox>
                        </Table.Cell>
                      )}
                      {di === 0 && (
                        <Table.Cell rowSpan={s.foodSchedule.length}>
                          <FlexBox>{s.clientCapacity}</FlexBox>
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
                          <FlexBox>
                            {d.scheduleStatus === 0
                              ? '요청'
                              : d.scheduleStatus === 1
                              ? '승인'
                              : '거절'}
                          </FlexBox>
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <FlexBox>{d.foodName} </FlexBox>
                      </Table.Cell>
                      {/* <Table.Cell>
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
                                onClick={() => changeStatus(d, b)}>
                                {b.text}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
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
                      </Table.Cell> */}

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
  white-space: nowrap;
`;
