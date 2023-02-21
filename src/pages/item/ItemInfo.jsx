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
import {exelProductAtom, productAtom} from '../../utils/store';
import ItemInfoTable from './components/ItemInfoTable';

// 상품 정보 페이지
const ItemInfo = () => {
  const {onActive} = useModal();
  const {data: productList} = useGetAllProductsList();
  const [product, setProduct] = useAtom(productAtom);
  const [exelProduct, setExelProduct] = useAtom(exelProductAtom);
  const [checkItems, setCheckItems] = useState([]);
  console.log(product, '-');
  const checkId = (e, id) => {
    e.stopPropagation();
    console.log(id, '11');
  };
  useEffect(() => {
    setProduct(productList);
  }, [productList, setProduct]);

  return (
    <PageWrapper>
      <BtnWrapper>
        <Button color="red" content="삭제" icon="delete" onClick={onActive} />
      </BtnWrapper>
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
