import {useAtom} from 'jotai';
import React, {useEffect} from 'react';
import {PageWrapper} from '../../../style/common.style';
import {CustomerDataAtom} from './store';
import useCustomerQuery from './useCustomerQuery';

const Customer = () => {
  const [customerData, setCustomerData] = useAtom(CustomerDataAtom);

  const {status, isLoading} = useCustomerQuery();

  if (isLoading)
    return (
      <>
        {' '}
        <div>로딩중입니다..</div>{' '}
      </>
    );

  if (status === 'error')
    return (
      <div>
        에러가 났습니다 ㅠㅠ 근데 다시 새로고침해보면 데이터 다시 나올수도
        있어요
      </div>
    );

  return (
    <PageWrapper>
      <div>ㅗㅑㅗㅑㅗㅑㅗㅑㅗㅑㅗㅑ</div>
    </PageWrapper>
  );
};

export default Customer;
