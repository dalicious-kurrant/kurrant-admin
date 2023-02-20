import {useState} from 'react';
import {Button, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {PageWrapper, TableWrapper} from '../../style/common.style';
import {formattedWeekDate} from '../../utils/dateFormatter';
import Select from 'react-select';

const Schedule = () => {
  const day = new Date();
  const days = formattedWeekDate(day);
  const [startDate, setStartDate] = useState(days);
  const [endDate, setEndDate] = useState(days);

  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };
  return (
    <PageWrapper>
      <div>기간별 판매 내역</div>
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
      <TableWrapper>
        <TopTable>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>상품</Table.HeaderCell>
                <Table.HeaderCell>상품 합계</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>꽃맛살샐러드</Table.Cell>
                <Table.Cell>20</Table.Cell>
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
