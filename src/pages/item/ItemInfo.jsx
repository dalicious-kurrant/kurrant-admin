/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Pagination} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from '../../style/common.style';
import {
  useGetAllProductsList,
  useGetExportProductsList,
} from '../../hooks/useProductsList';

import styled, {css} from 'styled-components';
import ItemExelTable from './components/ItemExelTable';
import {useAtom} from 'jotai';
import {
  exelProductAtom,
  exportProductAtom,
  productAtom,
  makersNameAtom,
  productPageAtom,
} from '../../utils/store';
import ItemInfoTable from './components/ItemInfoTable';

// 상품 정보 페이지
const ItemInfo = () => {
  const [option] = useAtom(makersNameAtom);
  const [product, setProduct] = useAtom(productAtom);
  const [, setExportExel] = useAtom(exportProductAtom);
  const [page, setPage] = useAtom(productPageAtom);

  const makersId = option && `&makersId=${option}`;
  const {data: productList, refetch: productRefetch} = useGetAllProductsList(
    200,
    page,
    makersId,
  );
  const {data: exportProductList, isLoading} = useGetExportProductsList();
  const [totalPage, setTotalPage] = useState(0);
  const [exelProduct] = useAtom(exelProductAtom);
  const [checkItems, setCheckItems] = useState([]);

  const checkId = (e, id) => {
    e.stopPropagation();
    // console.log(id, '11');
  };

  useEffect(() => {
    if (productList) {
      setTotalPage(productList?.data?.total);
      setProduct(productList?.data?.items);
      // console.log(productList?.data?.items);
    }
    if (!isLoading) {
      setExportExel(exportProductList?.data);
      // console.log('가져오는중');
    }
  }, [exportProductList, exportProductList?.data, isLoading, productList]);

  useEffect(() => {
    productRefetch();
  }, [page, makersId, productRefetch]);
  return (
    <PageWrapper>
      <TableWrapper>
        <PagenationBox totalPage={totalPage}>
          <Pagination
            defaultActivePage={page}
            totalPages={totalPage}
            boundaryRange={1}
            onPageChange={(e, data) => {
              setPage(data.activePage);
            }}
          />
        </PagenationBox>

        <ItemExelTable
          isShow={exelProduct}
          data={exelProduct}
          checked={checkId}
          checkItems={checkItems}
          setCheckItems={setCheckItems}
        />

        <ItemInfoTable
          isShow={product}
          data={product}
          setData={setProduct}
          checked={checkId}
          checkItems={checkItems}
          setCheckItems={setCheckItems}
        />
      </TableWrapper>
    </PageWrapper>
  );
};

export default ItemInfo;

const PagenationBox = styled.div`
  ${({totalPage}) => {
    if (totalPage) {
      return css`
        display: flex;
      `;
    } else {
      return css`
        display: none;
      `;
    }
  }}

  justify-content: center;
  align-items: center;
  padding-left: 50px;
  margin-bottom: 50px;
`;
