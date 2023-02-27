import React, {useEffect, useState} from 'react';
import {Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from '../../style/common.style';
import {
  useDeleteProductList,
  useGetAllProductsList,
} from '../../hooks/useProductsList';

import styled from 'styled-components';
import ItemExelTable from './components/ItemExelTable';
import {useAtom} from 'jotai';
import {exelProductAtom, productAtom} from '../../utils/store';
import ItemInfoTable from './components/ItemInfoTable';
import {useQueryClient} from 'react-query';

// 상품 정보 페이지
const ItemInfo = () => {
  const {data: productList} = useGetAllProductsList();
  const [product, setProduct] = useAtom(productAtom);
  const [exelProduct, setExelProduct] = useAtom(exelProductAtom);
  const [checkItems, setCheckItems] = useState([]);
  console.log(exelProduct, '00');
  const checkId = (e, id) => {
    e.stopPropagation();
    console.log(id, '11');
  };

  useEffect(() => {
    setProduct(productList);
  }, [productList, setProduct]);

  return (
    <PageWrapper>
      <TableWrapper>
        {exelProduct && (
          <ItemExelTable
            data={exelProduct}
            checked={checkId}
            checkItems={checkItems}
            setCheckItems={setCheckItems}
          />
        )}
        {product && (
          <ItemInfoTable
            data={product}
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
