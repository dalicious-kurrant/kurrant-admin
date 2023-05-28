import {PageWrapper} from 'style/common.style';
import styled from 'styled-components';
import FoodGroupTable from './Table/FoodGroupTable';

import {useEffect, useState} from 'react';
import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
import FoodGroupCreateModal from './Modal/FoodGroupCreateModal';
import useGetFoodGroupQuery from './useGetFoodGroupQuery';
import useFoodGroupMutation from './useFoodGroupMutation';

const FoodGroupPage = () => {
  const [showCRUDBundle, setShowCRUDBundle] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [checkboxList, setCheckboxList] = useState([]);

  const {getFoodGroupQueryRefetch, foodGroupData} = useGetFoodGroupQuery();

  const {deleteFoodGroupMutation} = useFoodGroupMutation();

  const handleBundleClick = buttonStatus => {
    if (buttonStatus === 'register') {
      setShowCreateModal(true);
    } else if (buttonStatus === 'delete') {
      console.log(checkboxList);

      if (
        window.confirm(
          `'${checkboxList
            .sort((a, b) => a - b)
            .join(', ')}'의 상품 그룹들을 삭제 하시겠습니까?`,
        )
      ) {
        deleteFoodGroupMutation({idList: checkboxList});
      }
    }
  };

  return (
    <PageWrapper>
      <div>
        <CRUDBundle
          handleBundleClick={handleBundleClick}
          showCRUDBundle={showCRUDBundle}
          buttonCloseList={['edit']}
        />
      </div>

      <FoodGroupTable
        data={foodGroupData}
        checkboxList={checkboxList}
        setCheckboxList={setCheckboxList}
      />

      <FoodGroupCreateModal
        open={showCreateModal}
        setOpen={setShowCreateModal}
      />
    </PageWrapper>
  );
};

export default FoodGroupPage;

const WordBreakSampleDiv = styled.div`
  width: 200px;
  border: 1px solid black;
`;

const WordBreakSpan = styled.span`
  /* word-break: normal; */
  word-break: break-all;
  /* word-break: keep-all; */
`;
