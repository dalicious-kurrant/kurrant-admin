import useModal from '../../hooks/useModal';
import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Table} from 'semantic-ui-react';
import {BtnWrapper, PageWrapper, TableWrapper} from '../../style/common.style';
import {useGetAllProductsList} from '../../hooks/useProductsList';
import withCommas from '../../utils/withCommas';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {useAtom} from 'jotai';
import {productAtom} from '../../utils/store';

// 상품 정보 페이지
const ItemInfo = () => {
  const navigate = useNavigate();
  const {onActive} = useModal();
  const {data: productList} = useGetAllProductsList();

  const [product] = useAtom(productAtom);
  const [key, setKey] = useState();

  const goToPage = (foodId, makersId) => {
    navigate('/shop/info/detail/' + foodId, {
      state: {
        foodId: foodId,
        makersId: makersId,
      },
    });
  };
  const checkId = (e, id) => {
    e.stopPropagation();
    console.log(id, '11');
  };

  useEffect(() => {
    if (product) setKey(Object.keys(product[0]));
  }, [product]);
  console.log(product, '1323');
  return (
    <PageWrapper>
      <BtnWrapper>
        <Button color="red" content="삭제" icon="delete" onClick={onActive} />
      </BtnWrapper>
      <TableWrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">
                <Checkbox />
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
              <Table.HeaderCell>메이커스 이름</Table.HeaderCell>
              <Table.HeaderCell>식품 이름</Table.HeaderCell>
              <Table.HeaderCell>상태</Table.HeaderCell>
              <Table.HeaderCell>매장가격</Table.HeaderCell>
              <Table.HeaderCell>매장할인률</Table.HeaderCell>
              <Table.HeaderCell>이벤트할인률</Table.HeaderCell>
              <Table.HeaderCell>최종가격</Table.HeaderCell>
              <Table.HeaderCell>설명</Table.HeaderCell>
              <Table.HeaderCell>식사태그</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {productList?.data.map((el, idx) => {
              return (
                <TableRow
                  onClick={() => goToPage(el.foodId, el.makersId)}
                  key={idx}>
                  <Table.Cell textAlign="center">
                    <Checkbox
                      onClick={e => {
                        checkId(e, el.foodId);
                      }}
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
                  <Table.Cell>
                    {el.foodTags + (idx !== 0 ? ',  ' : '')}
                  </Table.Cell>
                </TableRow>
              );
            })}
          </Table.Body>
        </Table>
      </TableWrapper>
    </PageWrapper>
  );
};

export default ItemInfo;

const TableRow = styled(Table.Row)`
  :hover {
    cursor: pointer;
    background-color: whitesmoke;
  }
`;
