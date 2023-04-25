import {Table} from 'semantic-ui-react';
import withCommas from 'utils/withCommas';

const OrderData = ({list}) => {
  return (
    <Table striped celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">메뉴명</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">금액</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">수량</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">
            최종 가격 <br /> (VAT 포함)
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {list?.paycheckDailyFoods.map((el, idx) => {
          return (
            <Table.Row key={idx}>
              <Table.Cell textAlign="center">{el.serviceDate}</Table.Cell>
              <Table.Cell>{el.foodName}</Table.Cell>
              <Table.Cell textAlign="right">
                {withCommas(el.supplyPrice)}
              </Table.Cell>
              <Table.Cell textAlign="center">{el.count}</Table.Cell>
              <Table.Cell textAlign="right">
                {withCommas(el.totalPrice)}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default OrderData;
