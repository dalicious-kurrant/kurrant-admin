import {useState} from 'react';
import {Button, Header, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {PageWrapper, TableWrapper} from '../../style/common.style';
import {formattedWeekDate} from '../../utils/dateFormatter';
import Select from 'react-select';

const Schedule = () => {
  const day = new Date();
  const days = formattedWeekDate(day);
  const [startDate, setStartDate] = useState(days);
  const [endDate, setEndDate] = useState(days);
  const [diningSelect, setDiningSelect] = useState(false);
  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };
  return (
    <PageWrapper>
      <Header as="h2">기간별 판매 내역</Header>
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
        <Button content="조회하기" basic />
      </CalendarWrap>
      <div>
        <SelectBox placeholder="메이커스" />
      </div>
      <Btn onClick={() => setDiningSelect(!diningSelect)} press={diningSelect}>
        아침
      </Btn>
      <Button content="점심" color="olive" toggle={true} />
      <Button content="저녁" color="olive" toggle={true} />
      <TableWrapper>
        <TopTable>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>상품명</Table.HeaderCell>
                <Table.HeaderCell>수량 합계</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={3}>꽃맛살샐러드</Table.Cell>
                <Table.Cell width={2}>20</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Total</Table.Cell>
                <Table.Cell>20</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table celled>
            <Table.Header>
              <Table.Row>
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
              </Table.Row>
              <Table.Row>
                <Table.Cell>20</Table.Cell>
                <Table.Cell>20</Table.Cell>
                <Table.Cell>20</Table.Cell>
                <Table.Cell>20</Table.Cell>
                <Table.Cell>20</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </TopTable>
      </TableWrapper>
      <TableWrapper>
        <MakersTable>
          <div>배송 시간</div>
          <div>메이커스 이름</div>
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
        </MakersTable>
      </TableWrapper>
    </PageWrapper>
  );
};

export default Schedule;

const DateInput = styled.input`
  padding: 4px;
  width: 200px;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.grey[5]};
`;

const CalendarWrap = styled.div`
  display: flex;
  align-items: center;
`;

const TopTable = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  background-color: gold;
`;
const SelectBox = styled(Select)`
  width: 250px;
`;

const MakersTable = styled.div`
  width: 30%;
  margin-top: 50px;
`;

const Btn = styled.div`
  width: 78px;
  height: 42px;
  text-align: center;
  border-radius: 4px;
  font-weight: 600;
  padding: 12px 24px;
  background-color: ${({press}) => (press ? '#b5cc18' : 'green')};
`;
