import Input from 'components/input/Input';
import React, {useEffect} from 'react';
import styled from 'styled-components';

import {FormProvider, useForm} from 'react-hook-form';

const Test = () => {
  const mockData = {
    foodName: '짜장면',
    foodPrice: '20000원',
    discountRate: '10%',
    discountPrice: '123',
    periodDiscountRate: '123',
    periodDiscountPrice: '123',
    customPrice: '123',
  };
  const form = useForm({
    mode: 'all',
  });
  const {
    setValue,
    handleSubmit,
  } = form;


  // useEffect(() => {
  //   console.log(foodName);
  //   console.log(foodPrice);
  //   console.log(discountRate);
  //   console.log(discountPrice);
  //   console.log(periodDiscountRate);
  //   console.log(periodDiscountPrice);
  //   console.log(customPrice);
  // }, [
  //   foodName,
  //   foodPrice,
  //   discountRate,
  //   discountPrice,
  //   periodDiscountRate,
  //   periodDiscountPrice,
  //   customPrice,
  // ]);

  useEffect(() => {
    setValue('foodName', mockData?.foodName);
    setValue('foodPrice', mockData?.foodPrice);
    setValue('discountRate', mockData?.discountRate);
    setValue('discountPrice', mockData?.discountPrice);
    setValue('periodDiscountRate', mockData?.periodDiscountRate);
    setValue('periodDiscountPrice', mockData?.periodDiscountPrice);
    setValue('customPrice', mockData?.customPrice);
  }, [
    mockData?.foodName,
    mockData?.foodPrice,
    mockData?.discountRate,
    mockData?.discountPrice,
    mockData?.periodDiscountRate,
    mockData?.periodDiscountPrice,
    mockData?.customPrice,
    setValue,
  ]);

  const hello = data => {
    console.log(data);
  };

  return (
    <>
      <InputWrap>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(hello)}>
            <Input name="foodName" label="메뉴명" width="200px" readOnly />
            <Input name="foodPrice" label="매장가" />
            <Input name="discountRate" label="할인율" />
            <Input name="discountPrice" label="할인가" readOnly />
            <Input name="periodDiscountRate" label="기간할인율" />
            <Input name="periodDiscountPrice" label="기간할인가" readOnly />
            <Input name="customPrice" label="커스텀가" />

            <button>제출</button>
          </form>
        </FormProvider>
      </InputWrap>
    </>
  );
};
export default Test;

const InputWrap = styled.section`
  display: flex;
  flex-direction: row;
`;
