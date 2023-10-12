import {PageWrapper} from 'style/common.style';
import FoodGroupTable from './Table/FoodGroupTable';

import {useState} from 'react';
import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
// import FoodGroupCreateModal from './Modal/FoodGroupCreateModal';
import useGetFoodGroupQuery from './useGetFoodGroupQuery';
import useFoodGroupMutation from './useFoodGroupMutation';
import FoodGroupCreateModal from './Modal/FoodGroupCreateModal';

const FoodGroupPage = () => {
  const [showCRUDBundle] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [checkboxList, setCheckboxList] = useState([]);

  const {foodGroupData} = useGetFoodGroupQuery();

  const {deleteFoodGroupMutation} = useFoodGroupMutation(
    () => {
      setShowCreateModal(false);
    },
    () => {
      setShowCreateModal(false);
    },
    () => {
      setCheckboxList([]);
    },
  );

  const handleBundleClick = buttonStatus => {
    if (buttonStatus === 'register') {
      setShowCreateModal(true);
    } else if (buttonStatus === 'delete') {
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


