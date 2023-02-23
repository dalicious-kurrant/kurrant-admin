import useModal from '../../hooks/useModal';
import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Table} from 'semantic-ui-react';
import {BtnWrapper, PageWrapper, TableWrapper} from '../../style/common.style';
import {
  useDeleteProductList,
  useGetAllProductsList,
} from '../../hooks/useProductsList';
import withCommas from '../../utils/withCommas';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import ItemExelTable from './components/ItemExelTable';
import {useAtom} from 'jotai';
import {exelProductAtom, productAtom} from '../../utils/store';
import ItemInfoTable from './components/ItemInfoTable';
import Modal from '../../components/alertModal/AlertModal';
import {useQueryClient} from 'react-query';
import {useCancelOrder} from '../../hooks/useOrderList';

// 상품 정보 페이지
const ItemInfo = () => {
  const {onActive} = useModal();
  const queryClient = useQueryClient();
  const {data: productList} = useGetAllProductsList();
  const {mutateAsync: cancelProduct} = useDeleteProductList();
  const [product, setProduct] = useAtom(productAtom);
  const [exelProduct, setExelProduct] = useAtom(exelProductAtom);
  const [checkItems, setCheckItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const checkId = (e, id) => {
    e.stopPropagation();
    console.log(id, '11');
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const cancelButton = async () => {
    await cancelProduct({foodId: checkItems});
    closeModal();
    queryClient.invalidateQueries('allList');
  };
  useEffect(() => {
    setProduct(productList);
  }, [productList, setProduct]);

  return (
    <PageWrapper>
      <BtnWrapper>
        <Button
          color="red"
          content="상품 삭제"
          icon="delete"
          onClick={() => {
            openModal();
          }}
        />
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
      <Modal
        open={modalOpen}
        message={'선택한 주문을 취소하시겠습니까?'}
        setAlertModalOpen={closeModal}
        action={cancelButton}
        actionMessage={'예'}
        cancelMessage={'아니오'}
        label={`선택된 수 ${checkItems.length}`}
      />
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
