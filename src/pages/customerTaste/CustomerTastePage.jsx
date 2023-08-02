import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
import {useState} from 'react';
import {PageWrapper} from 'style/common.style';
import styled from 'styled-components';
import CustomerTasteTable from './Table/CustomerTasteTable';
import CustomerTasteCreateModal from './Modal/CustomerTasteCreateModal';
import useGetCustomerTasteQuery from './useGetCustomerTasteQuery';
import {Button} from 'semantic-ui-react';

const CustomerTastePage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [checkboxList, setCheckboxList] = useState([]);

  // 테이블 값들
  const [inputValue1, setInputValue1] = useState([]);
  const [inputValue2, setInputValue2] = useState([]);
  const [inputValue3, setInputValue3] = useState([]);
  const [inputValue4, setInputValue4] = useState([]);

  // bundle Click

  const {customerTasteFoodIdList, customerTasteFoodIdsQueryRefetch} =
    useGetCustomerTasteQuery();

  const handleBundleClick = buttonStatus => {
    switch (buttonStatus) {
      case 'register':
        // setShowCreateModal(true);
        break;
      case 'delete':
        if (
          window.confirm(
            `'${checkboxList
              .sort((a, b) => a - b)
              .join(', ')}'의 상품 그룹들을 삭제 하시겠습니까?`,
          )
        ) {
          // deleteRecommendationMutation({idList: checkboxList});
        }
        break;
      default:
        break;
    }
  };

  const handleEditClick = e => {
    console.log('클릭');
  };

  return (
    <PageWrapper>
      {/* <div>
        <CRUDBundle
          handleBundleClick={handleBundleClick}
          showCRUDBundle={false}
          buttonCloseList={['register', 'edit']}
          deleteName="열 삭제하기"
        />
      </div> */}

      <CustomerTasteTable
        data={customerTasteFoodIdList}
        // data={[]}
        checkboxList={checkboxList}
        setCheckboxList={setCheckboxList}
        inputValue1={inputValue1}
        setInputValue1={setInputValue1}
        inputValue2={inputValue2}
        setInputValue2={setInputValue2}
        inputValue3={inputValue3}
        setInputValue3={setInputValue3}
        inputValue4={inputValue4}
        setInputValue4={setInputValue4}
      />

      {/* <Button id="edit" color="blue" inverted onClick={handleEditClick}>
        수정
      </Button> */}

      {/* <CustomerTasteCreateModal
        open={showCreateModal}
        setOpen={setShowCreateModal}
      /> */}
    </PageWrapper>
  );
};

export default CustomerTastePage;

const ContainerSection = styled.section`
  border: 1px solid black;
  /* padding: ; */
`;
