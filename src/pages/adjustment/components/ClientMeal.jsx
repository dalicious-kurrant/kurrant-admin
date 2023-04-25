import {useGetSpotOrders} from 'hooks/useAdjustment';
import {useLocation} from 'react-router-dom';
import {Label, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import withCommas from 'utils/withCommas';
import ScrollToTop from '../../../asset/image/scrollTop.png';

const ClientMeal = ({id}) => {
  const {data: orderData} = useGetSpotOrders(id);

  const corporationInfo = orderData?.data?.corporationInfo;
  const item = orderData?.data?.corporationOrderItems;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Wrap>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              colSpan={6}
              style={{
                backgroundColor: '#bdbac1',
                paddingTop: 6,
                paddingBottom: 6,
              }}>
              식수 개요
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <TableCell textAlign="center">고객사 이름</TableCell>
            <Table.Cell textAlign="center">{corporationInfo?.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <TableCell textAlign="center">기간</TableCell>
            <Table.Cell textAlign="center">
              {corporationInfo?.period}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <TableCell textAlign="center">아침 총 식수</TableCell>
            <Table.Cell textAlign="center">
              {corporationInfo?.morningCount}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <TableCell textAlign="center">점심 총 식수</TableCell>
            <Table.Cell textAlign="center">
              {corporationInfo?.lunchCount}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <TableCell textAlign="center">저녁 총 식수</TableCell>
            <Table.Cell textAlign="center">
              {corporationInfo?.dinnerCount}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <TableCell textAlign="center">총액(VAT 포함)</TableCell>
            <Table.Cell textAlign="center">
              {withCommas(corporationInfo?.totalPrice)}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              colSpan={8}
              style={{
                backgroundColor: '#bdbac1',
                paddingTop: 6,
                paddingBottom: 6,
              }}>
              식수 내역
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">식사타입</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">메이커스</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">상품</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">사용 지원금</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">개수</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">구매자</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">이메일</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {item?.map((el, idx) => {
            const test = item.filter(v => v.serviceDate === el.serviceDate);

            return (
              <Table.Row key={idx}>
                <Table.Cell textAlign="center">
                  <InnerCell>{el.serviceDate}</InnerCell>
                </Table.Cell>

                <Table.Cell textAlign="center">
                  <InnerCell>{el.diningType}</InnerCell>
                </Table.Cell>
                <Table.Cell>
                  <InnerCell>{el.makers}</InnerCell>
                </Table.Cell>
                <Table.Cell>
                  <InnerCell>{el.food}</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <InnerCell>{withCommas(el.supportPrice)}</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <InnerCell>{el.count}</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <InnerCell>{el.user}</InnerCell>
                </Table.Cell>
                <Table.Cell>
                  <InnerCell>{el.email}</InnerCell>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <ScrollButton onClick={scrollToTop} style={{cursor: 'pointer'}}>
        <Image src={ScrollToTop} alt="" />
      </ScrollButton>
    </Wrap>
  );
};

export default ClientMeal;

const TableCell = styled(Table.Cell)`
  background-color: ${({theme}) => theme.colors.grey[8]};
`;

const Wrap = styled.div`
  margin-top: 24px;
  width: 70%;
`;

const InnerCell = styled.div`
  white-space: nowrap;
`;

const ScrollButton = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
`;

const Image = styled.img`
  width: 50px;
`;
