import {useLocation, useNavigate} from 'react-router-dom';
import {FormProvider, useForm} from 'react-hook-form';
import Input from '../../components/input/Input';
import styled from 'styled-components';

import {useEffect, useState} from 'react';
import withCommas from '../../utils/withCommas';
import HashTag from '../../components/hashTag/HashTag';
import {useQueryClient} from 'react-query';
import {
  useEditProductDetail,
  useGetDetailProductsList,
} from '../../hooks/useProductsList';

const ProductDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const foodId = location.state.foodId;
  const makersId = location.state.makersId;

  const queryClient = useQueryClient();
  const {data: detailData} = useGetDetailProductsList(foodId, makersId);
  const {mutateAsync: editData} = useEditProductDetail();
  const listData = detailData?.data;

  const [clicked, setClicked] = useState([]);

  const form = useForm({
    mode: 'all',
  });
  const {
    formState: {errors},
    watch,
    handleSubmit,
    setValue,
  } = form;

  const foodName = watch('foodName');
  const foodPrice = watch('foodPrice');
  const discountRate = watch('discountRate');
  const discountPrice = watch('discountPrice');
  const periodDiscountRate = watch('periodDiscountRate');
  const periodDiscountPrice = watch('periodDiscountPrice');
  const customPrice = watch('customPrice');

  const modifyButton = async () => {
    const data = {
      foodId: listData?.foodId,
      makersDiscountRate: Number(discountRate),
      periodDiscountRate: Number(periodDiscountRate),
      foodTags: clicked,
    };
    console.log(data);
    await editData(data);
    navigate(-1);
    //queryClient.invalidateQueries('productDetail');
  };
  useEffect(() => {
    setValue('foodName', listData?.foodName);
    setValue('foodPrice', withCommas(listData?.foodPrice));
    setValue(
      'discountRate',
      listData?.makersDiscountRate === 0 ? '0' : listData?.makersDiscountRate,
    );
    setValue(
      'discountPrice',
      withCommas(
        listData?.makersDiscountPrice === 0
          ? '0'
          : listData?.makersDiscountPrice,
      ),
    );
    setValue(
      'periodDiscountRate',
      listData?.periodDiscountRate === 0 ? '0' : listData?.periodDiscountRate,
    );
    setValue(
      'periodDiscountPrice',
      withCommas(
        listData?.periodDiscountPrice === 0
          ? '0'
          : listData?.periodDiscountPrice,
      ),
    );
    setValue(
      'customPrice',
      listData?.customPrice === 0 ? '0' : listData?.customPrice,
    );
    setClicked(listData?.foodTags);
  }, [
    listData?.customPrice,
    listData?.foodName,
    listData?.foodPrice,
    listData?.makersDiscountPrice,
    listData?.makersDiscountRate,
    listData?.periodDiscountPrice,
    listData?.periodDiscountRate,
    listData?.foodTags,
    setValue,
  ]);
  return (
    <Wrap>
      <Container>
        <div>
          <TagTitle>정기식 수정</TagTitle>
        </div>
        <InputWrap>
          <FormProvider {...form}>
            <Input name="foodName" label="메뉴명" width="200px" />
            <Input name="foodPrice" label="매장가" />
            <Input name="discountRate" label="할인율" />
            <Input name="discountPrice" label="할인가" />
            <Input name="periodDiscountRate" label="기간할인율" />
            <Input name="periodDiscountPrice" label="기간할인가" />
            <Input name="customPrice" label="커스텀가" />
          </FormProvider>
        </InputWrap>
        <div>
          <TagTitle>해시태그 등록</TagTitle>
          <HashTagWrap>
            <HashTag clicked={clicked} setClicked={setClicked} />
          </HashTagWrap>
        </div>
        <ModifyButtonWrap>
          <ModifyButton onClick={modifyButton}>수정하기</ModifyButton>
        </ModifyButtonWrap>
      </Container>
    </Wrap>
  );
};

export default ProductDetailPage;

const Wrap = styled.div`
  flex-wrap: wrap;
  padding-top: 60px;
  padding-bottom: 100px;
`;

const Container = styled.div`
  width: 80%;
  margin: auto;
`;
const InputWrap = styled.div`
  display: flex;
`;

const TagTitle = styled.div`
  font-size: 19px;
  font-weight: 700;
  color: #f2994a;
  margin: 50px 0px;
`;

const HashTagWrap = styled.div`
  width: 100%;

  padding-right: 40px;
`;
const ModifyButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
const ModifyButton = styled.div`
  border: 0.5px solid #c8c8d2;
  background: linear-gradient(270deg, #0a0aa4 0%, #3d00e6 57.86%, #5a1eff 100%);
  border-radius: 8px;
  padding: 12px 48px;
  font-weight: 600;
  color: white;
  cursor: pointer;
`;
