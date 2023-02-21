import useModal from '../../hooks/useModal';
import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Table} from 'semantic-ui-react';
import {BtnWrapper, PageWrapper, TableWrapper} from '../../style/common.style';
import {useGetAllProductsList} from '../../hooks/useProductsList';
import withCommas from '../../utils/withCommas';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import ItemExelTable from './components/ItemExelTable';
import {useAtom} from 'jotai';
import {productAtom} from '../../utils/store';
import ItemInfoTable from './components/ItemInfoTable';

// 상품 정보 페이지
const ItemInfo = () => {
  const {onActive} = useModal();
  const {data: productList} = useGetAllProductsList();
  const [product, setProduct] = useAtom(productAtom);
  const [checkItems, setCheckItems] = useState([]);

  const checkId = (e, id) => {
    e.stopPropagation();
    console.log(id, '11');
  };

  return (
    <PageWrapper>
      <BtnWrapper>
        <Button color="red" content="삭제" icon="delete" onClick={onActive} />
      </BtnWrapper>
      <TableWrapper>
        {product && (
          <ItemExelTable
            data={product}
            checked={checkId}
            checkItems={checkItems}
            setCheckItems={setCheckItems}
          />
        )}
        {!product && (
          <ItemInfoTable
            data={productList}
            checked={checkId}
            checkItems={checkItems}
            setCheckItems={setCheckItems}
          />
        )}
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
