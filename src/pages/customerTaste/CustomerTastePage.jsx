import {useState} from 'react';
import {PageWrapper} from 'style/common.style';
import CustomerTasteTable from './Table/CustomerTasteTable';
import useGetCustomerTasteQuery from './useGetCustomerTasteQuery';

const CustomerTastePage = () => {
  const [checkboxList, setCheckboxList] = useState([]);

  // 테이블 값들
  const [inputValue1, setInputValue1] = useState([]);
  const [inputValue2, setInputValue2] = useState([]);
  const [inputValue3, setInputValue3] = useState([]);
  const [inputValue4, setInputValue4] = useState([]);

  // bundle Click

  const {customerTasteFoodIdList, } =
    useGetCustomerTasteQuery();

 

  return (
    <PageWrapper>
    

      <CustomerTasteTable
        data={customerTasteFoodIdList}
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

    
    </PageWrapper>
  );
};

export default CustomerTastePage;

