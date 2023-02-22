import {useNavigate} from 'react-router-dom';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import withCommas from '../../../utils/withCommas';

const ItemInfoTable = ({data, checked, checkItems, setCheckItems}) => {
  const navigate = useNavigate();

  const goToPage = (foodId, makersId) => {
    navigate('/shop/info/detail/' + foodId, {
      state: {
        foodId: foodId,
        makersId: makersId,
      },
    });
  };

  const checkboxList = data?.data?.map(el => el.foodId);

  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      data?.data?.forEach(el => idArray.push(el.foodId));

      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter(el => el !== id));
    }
  };
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">
            <input
              checked={
                checkItems?.length === checkboxList?.length ? true : false
              }
              type="checkbox"
              onChange={e => handleAllCheck(e.target.checked)}
            />
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
          <Table.HeaderCell>메이커스 이름</Table.HeaderCell>
          <Table.HeaderCell>식품 이름</Table.HeaderCell>
          <Table.HeaderCell>상태</Table.HeaderCell>
          <Table.HeaderCell>매장가격</Table.HeaderCell>
          <Table.HeaderCell>매장할인률</Table.HeaderCell>
          <Table.HeaderCell>이벤트할인률</Table.HeaderCell>
          <Table.HeaderCell>최종가격</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">설명</Table.HeaderCell>
          <Table.HeaderCell>식사태그</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data?.data.map((el, idx) => {
          return (
            <TableRow
              onClick={() => goToPage(el.foodId, el.makersId)}
              key={idx}>
              <Table.Cell textAlign="center">
                <input
                  checked={checkItems.includes(el.foodId) ? true : false}
                  type="checkbox"
                  onClick={e => checked(e, el.foodId)}
                  onChange={e => handleSingleCheck(e.target.checked, el.foodId)}
                />
              </Table.Cell>
              <Table.Cell textAlign="center">{el.foodId}</Table.Cell>
              <Table.Cell>{el.makersName}</Table.Cell>
              <Table.Cell>{el.foodName}</Table.Cell>
              <Table.Cell>{el.foodStatus}</Table.Cell>
              <Table.Cell textAlign="right">
                {withCommas(el.defaultPrice)}
              </Table.Cell>
              <Table.Cell textAlign="right">{el.makersDiscount}</Table.Cell>
              <Table.Cell textAlign="right">{el.eventDiscount}</Table.Cell>
              <Table.Cell textAlign="right">
                {withCommas(el.resultPrice)}
              </Table.Cell>
              <Table.Cell>{el.description}</Table.Cell>
              <Table.Cell>{el.foodTags + (idx !== 0 ? ',  ' : '')}</Table.Cell>
            </TableRow>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default ItemInfoTable;

const TableRow = styled(Table.Row)`
  :hover {
    cursor: pointer;
    background-color: whitesmoke;
  }
`;
