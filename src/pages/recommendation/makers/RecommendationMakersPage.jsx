import {PageWrapper} from 'style/common.style';
import styled from 'styled-components';

import {useEffect, useState} from 'react';
import useGetRecommendationMakersQuery from './useGetRecommendationMakersQuery';
import RecommendationTable from './Table/RecommendationTable';
import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
import useRecommendationMutation from './useRecommendationMutation';
import RecommendationCreateModal from './Modal/RecommendationCreateModal';

const RecommendationMakersPage = () => {
  const [showCRUDBundle, setShowCRUDBundle] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [checkboxList, setCheckboxList] = useState([]);

  const {getRecommendationMakersQueryRefetch, recommendationMakersData} =
    useGetRecommendationMakersQuery();

  const {deleteRecommendationMutation} = useRecommendationMutation();

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
        deleteRecommendationMutation({idList: checkboxList});
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
