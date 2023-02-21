import {useState} from 'react';
import {Button, Header, Label, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {PageWrapper, TableWrapper} from '../../style/common.style';
import {formattedWeekDate} from '../../utils/dateFormatter';
import Select from 'react-select';
import DiningButton from './components/DiningButton';

const Schedule = () => {
  const day = new Date();
  const days = formattedWeekDate(day);
  const [startDate, setStartDate] = useState(days);
  const [endDate, setEndDate] = useState(days);
  const [diningSelect, setDiningSelect] = useState([0, 1, 2]);
  console.log(diningSelect);
  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };
  return (
    <PageWrapper>
      <Header as="h2">기간별 판매 내역</Header>
      <div>
        <SelectBox placeholder="메이커스" />
      </div>
      <CalendarWrap>
        <div>
          <DateInput
            type="date"
            defaultValue={startDate}
            onChange={e => getStartDate(e)}
          />
          <span>-</span>
          <DateInput
            type="date"
            defaultValue={endDate}
            onChange={e => getEndDate(e)}
          />
        </div>
        <DiningButton touch={diningSelect} setTouch={setDiningSelect} />
        <Button content="조회하기" basic size="tiny" />
      </CalendarWrap>

      <TableWrapper>
        <TopTable>
          <TotalTable>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>상품명</Table.HeaderCell>
                  <Table.HeaderCell>합계(개)</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>꽃맛살샐러드</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>그릴소세지샐러드</Table.Cell>
                  <Table.Cell>10</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Total</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </TotalTable>
          <DetailTable>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>2월 20일 아침</Table.HeaderCell>
                  <Table.HeaderCell>2월 20일 아침</Table.HeaderCell>
                  <Table.HeaderCell>2월 20일 아침</Table.HeaderCell>
                  <Table.HeaderCell>2월 20일 아침</Table.HeaderCell>
                  <Table.HeaderCell>2월 20일 아침</Table.HeaderCell>
                  <Table.HeaderCell>2월 20일 아침</Table.HeaderCell>
                  <Table.HeaderCell>2월 20일 아침</Table.HeaderCell>
                  <Table.HeaderCell>2월 20일 아침</Table.HeaderCell>
                  <Table.HeaderCell>2월 20일 아침</Table.HeaderCell>
                  <Table.HeaderCell>2월 20일 아침</Table.HeaderCell>
                  <Table.HeaderCell>2월 20일 아침</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>10</Table.Cell>
                  <Table.Cell>10</Table.Cell>
                  <Table.Cell>10</Table.Cell>
                  <Table.Cell>10</Table.Cell>
                  <Table.Cell>10</Table.Cell>
                  <Table.Cell>10</Table.Cell>
                  <Table.Cell>10</Table.Cell>
                  <Table.Cell>10</Table.Cell>
                  <Table.Cell>10</Table.Cell>
                  <Table.Cell>10</Table.Cell>
                  <Table.Cell>10</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </DetailTable>
        </TopTable>
      </TableWrapper>
      <TableWrapper>
        <MakersTable>
          <Label content="2월 20일 아침" color="yellow" />
          <DiningTypeWrap>
            <MealDetailWrap>
              <div>
                <div>배송 시간</div>
                <div>고객사 A</div>
                <div>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>상품명</Table.HeaderCell>
                        <Table.HeaderCell>수량</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>꽃맛살샐러드</Table.Cell>
                        <Table.Cell>1</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </MealDetailWrap>
            <MealDetailWrap>
              <div>
                <div>배송 시간</div>
                <div>고객사 B</div>
                <div>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>상품명</Table.HeaderCell>
                        <Table.HeaderCell>수량</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>꽃맛살샐러드</Table.Cell>
                        <Table.Cell>1</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </MealDetailWrap>
          </DiningTypeWrap>
        </MakersTable>
        <MakersTable>
          <Label content="2월 20일 점심" color="yellow" />
          <DiningTypeWrap>
            <MealDetailWrap>
              <div>
                <div>배송 시간</div>
                <div>고객사 C</div>
                <div>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>상품명</Table.HeaderCell>
                        <Table.HeaderCell>수량</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>꽃맛살샐러드</Table.Cell>
                        <Table.Cell>1</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </MealDetailWrap>
            <MealDetailWrap>
              <div>
                <div>배송 시간</div>
                <div>고객사 D</div>
                <div>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>상품명</Table.HeaderCell>
                        <Table.HeaderCell>수량</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>꽃맛살샐러드</Table.Cell>
                        <Table.Cell>1</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </MealDetailWrap>
          </DiningTypeWrap>
        </MakersTable>
      </TableWrapper>
    </PageWrapper>
  );
};

export default Schedule;

const DateInput = styled.input`
  padding: 4px;
  width: 200px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.grey[5]};
`;

const CalendarWrap = styled.div`
  display: flex;
  align-items: center;

  margin: 24px 0;
`;

const TopTable = styled.div`
  margin-top: 50px;
  display: flex;
`;
const SelectBox = styled(Select)`
  width: 250px;
`;

const MakersTable = styled.div`
  margin-top: 50px;
`;

const TotalTable = styled.div`
  margin-right: 10px;
  width: 30%;
`;

const DetailTable = styled.div`
  overflow-x: auto;
`;

const MealDetailWrap = styled.div`
  display: flex;
  margin-right: 24px;
`;

const DiningTypeWrap = styled.div`
  display: flex;
  margin-top: 24px;
`;
