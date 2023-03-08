import React, {useEffect, useState} from 'react';
import {Pagination, PaginationItem, Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from '../../style/common.style';
import {
  useDeleteProductList,
  useGetAllProductsList,
  useGetExportProductsList,
} from '../../hooks/useProductsList';

import styled from 'styled-components';
import ItemExelTable from './components/ItemExelTable';
import {useAtom} from 'jotai';
import {
  exelProductAtom,
  exportProductAtom,
  productAtom,
  makersNameAtom,
} from '../../utils/store';
import ItemInfoTable from './components/ItemInfoTable';
import {useQueryClient} from 'react-query';

// 상품 정보 페이지
const ItemInfo = () => {
  const [option, setOption] = useAtom(makersNameAtom);
  const [product, setProduct] = useAtom(productAtom);
  const [exportExel, setExportExel] = useAtom(exportProductAtom);
  const [page, setPage] = useState(1);

  const makersId = option && `&makersId=${option}`;
  const {data: productList, refetch: productRefetch} = useGetAllProductsList(
    200,
    page,
    makersId,
  );
  const {data: exportProductList} = useGetExportProductsList();
  const [totalPage, setTotalPage] = useState(0);
  const [exelProduct, setExelProduct] = useAtom(exelProductAtom);
  const [checkItems, setCheckItems] = useState([]);

  const checkId = (e, id) => {
    e.stopPropagation();
    // console.log(id, '11');
  };

  useEffect(() => {
    // console.log(productList?.data);
    if (productList) {
      setTotalPage(productList?.data?.total);
      setProduct(productList?.data?.items);
      console.log(productList?.data?.items);
      setExportExel(exportProductList?.data);
    }
  }, [productList, setProduct]);
  useEffect(() => {
    productRefetch();
  }, [page, makersId, productRefetch]);
  return (
    <PageWrapper>
      <TableWrapper>
        {totalPage > 0 && (
          <PagenationBox>
            <Pagination
              defaultActivePage={page}
              totalPages={totalPage}
              boundaryRange={1}
              onPageChange={(e, data) => {
                setPage(data.activePage);
              }}
            />
          </PagenationBox>
        )}

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
            setData={setProduct}
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

const PagenationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 50px;
  margin-bottom: 50px;
`;
