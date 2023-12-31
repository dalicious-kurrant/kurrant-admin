import {PageWrapper} from 'style/common.style';

import { useState} from 'react';
import useGetRecommendationMakersQuery from './useGetRecommendationMakersQuery';
import RecommendationTable from './Table/RecommendationTable';
import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
import useRecommendationMutation from './useRecommendationMutation';
import RecommendationCreateModal from './Modal/RecommendationCreateModal';

const RecommendationMakersPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [checkboxList, setCheckboxList] = useState([]);

  const {recommendationMakersData} = useGetRecommendationMakersQuery();

  const {deleteRecommendationMutation} = useRecommendationMutation(
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
        deleteRecommendationMutation({idList: checkboxList});
      }
    }
  };

  return (
    <PageWrapper>
      <div>
        <CRUDBundle
          handleBundleClick={handleBundleClick}
          showCRUDBundle={false}
          buttonCloseList={['edit']}
        />
      </div>

      <RecommendationTable
        data={recommendationMakersData}
        checkboxList={checkboxList}
        setCheckboxList={setCheckboxList}
      />

      <RecommendationCreateModal
        open={showCreateModal}
        setOpen={setShowCreateModal}
      />
    </PageWrapper>
  );
};

export default RecommendationMakersPage;
